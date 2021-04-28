import { useEffect, useState } from 'react';
import productApi from '../clientProductsApp/ProductApi';
import { CategoriesResponse, Categoria } from '../interfaces/appInterfaces';

export const useCategories = () => {

  const [categories, setCategories] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const resp = await productApi.get<CategoriesResponse>('/api/categorias');
    setCategories(resp.data.categorias);
    setIsLoading(false);
  };

  return {
    categories,
    isLoading,
  };
};
