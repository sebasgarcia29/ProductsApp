import React, { createContext, useEffect, useState } from 'react';
import { Producto, ProductsResponse } from '../interfaces/productsInterface';
import productApi from '../clientProductsApp/ProductApi';
import { ImagePickerResponse } from 'react-native-image-picker';

type ProductsContextProps = {
  products: Producto[];
  loadProducts: () => Promise<void>;
  addProduct: (categoryId: string, productName: string) => Promise<Producto>;
  updateProduct: (categoryId: string, productName: string, productId: string) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  loadProductById: (id: string) => Promise<Producto>;
  uploadImage: (data: any, id: string) => Promise<void>; // TODO cambiar any
  loadingImage: boolean;
}

export const ProductContext = createContext({} as ProductsContextProps);


export const ProductProvider = ({ children }: any) => {

  const [products, setProducts] = useState<Producto[]>([]);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);


  const loadProducts = async () => {
    const resp = await productApi.get<ProductsResponse>('/api/productos?limite=100');
    setProducts([...resp.data.productos]);
  };


  const addProduct = async (categoryId: string, productName: string): Promise<Producto> => {
    const resp = await productApi.post<Producto>('/api/productos',
      {
        nombre: productName,
        categoria: categoryId,
      });
    setProducts([...products, resp.data]);
    return resp.data;
  };


  const updateProduct = async (categoryId: string, productName: string, productId: string) => {
    const resp = await productApi.put<Producto>(`/api/productos/${productId}`,
      {
        nombre: productName,
        categoria: categoryId,
      });
    setProducts(products.map(prod => (prod._id === productId) ? resp.data : prod));
  };

  const deleteProduct = async (productId: string) => {
    try {
      const resp = await productApi.delete(`/api/productos/${productId}`);
      setProducts(products.map(prod => (prod._id === productId) ? resp.data : prod));
    } catch (error) {
      console.log({ error });
    }
  };
  const loadProductById = async (id: string): Promise<Producto> => {
    const resp = await productApi.get<Producto>(`api/productos/${id}`);
    return resp.data;
  };

  const uploadImage = async (data: ImagePickerResponse, id: string) => {
    setLoadingImage(true);
    const fileToUpload = {
      uri: data.uri,
      type: data.type,
      name: data.fileName,
    };
    const formData = new FormData();
    formData.append('archivo', fileToUpload);
    await productApi.put(`/api/uploads/productos/${id}`, formData);
    setLoadingImage(false);
  };


  return (
    <ProductContext.Provider value={{
      products,
      loadProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      loadProductById,
      uploadImage,
      loadingImage,
    }}>
      {children}
    </ProductContext.Provider>
  );
};
