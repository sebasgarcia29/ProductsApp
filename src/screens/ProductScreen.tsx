/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { useCategories } from '../hooks/useCategories';
import { useForm } from '../hooks/useForm';
import { ProductContext } from '../context/ProductContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductScreen'> { }



export const ProductScreen = ({ route, navigation }: Props) => {

  const { name = '', id = '' } = route.params;

  const { loadProductById, addProduct, updateProduct, uploadImage } = useContext(ProductContext);

  const [tempUri, setTempUri] = useState<string>();

  const initState = {
    _id: id,
    categoriaID: '',
    nombre: name,
    img: '',
  };

  const { categories } = useCategories();

  const { nombre, onChange, setFormValue, categoriaID, img, _id } = useForm(initState);

  useEffect(() => {
    navigation.setOptions({
      title: nombre ? nombre : 'Sin nombre de producto',
    });
  }, [nombre]);

  useEffect(() => {
    loadProduct();
  }, []);


  const loadProduct = async () => {
    if (id.length === 0) { return; }
    const product = await loadProductById(id);
    setFormValue({
      _id: id,
      categoriaID: product.categoria._id,
      img: product.img || '',
      nombre: nombre,
    });
  };

  const saveOrUpdate = async () => {
    if (id.length > 0) {
      updateProduct(categoriaID, nombre, id);
    } else {
      const tempCategoriaId = categoriaID || categories[0]._id;
      const newProduct = await addProduct(tempCategoriaId, nombre);
      onChange(newProduct._id, '_id');
    }
  };

  const takePhoto = () => {
    launchCamera({
      mediaType: 'photo',
      quality: 0.7,
    }, (resp) => {
      if (resp.didCancel) { return; }
      if (!resp.uri) { return; }
      setTempUri(resp.uri);
      uploadImage(resp, _id);
    });
  };

  const takePhotoFromGalery = () => {
    launchImageLibrary({
      mediaType: 'photo',
      quality: 0.7,
    }, (resp) => {
      if (resp.didCancel) { return; }
      if (!resp.uri) { return; }
      setTempUri(resp.uri);
      uploadImage(resp, _id);
    });
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.label}>
          {name}
        </Text>
        <TextInput
          placeholder={'Producto'}
          style={styles.textInput}
          value={nombre}
          onChangeText={(value) => onChange(value, 'nombre')}
        />

        {/* Picker */}
        <Text style={styles.label}>
          Categoria:
        </Text>

        <Picker
          selectedValue={categoriaID}
          onValueChange={(value) => onChange(value, 'categoriaID')}
        >
          {categories.map(c => (
            <Picker.Item
              label={c.nombre}
              value={c._id}
              key={c._id} />
          ))}
        </Picker>

        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.addButton}
          onPress={saveOrUpdate}
        >
          <Icon name={'save'} size={30} color={'#2f1c64'} />
          <Text style={styles.saveButton}> Guardar </Text>
        </TouchableOpacity>

        {/* Section Gallery and Camera */}

        {_id.length > 0 && (
          <View style={styles.containerButtons}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.addButton}
              onPress={takePhoto}
            >
              <Icon name={'camera-retro'} size={30} color={'#2c9d71'} />
              <Text> Camera </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.4}
              style={styles.addButton}
              onPress={takePhotoFromGalery}
            >
              <Icon name={'photo-video'} size={30} color={'#f84e1e'} />
              <Text> Galeria </Text>
            </TouchableOpacity>
          </View>
        )}

        {img.length > 0 && !tempUri && (
          <Image
            source={{ uri: img }}
            style={styles.productImage}
          />
        )}

        {/* Mostar imagen temporal */}

        {tempUri && (
          <Image
            source={{ uri: tempUri }}
            style={styles.productImage}
          />
        )}



        {/* <Text> {JSON.stringify(form, null, 5)} </Text> */}

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  containerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.5)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
  addButton: {
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: 280,
    borderRadius: 20,
    marginVertical: 20,
    borderColor: 'black',
    borderWidth: 2,
    resizeMode: 'cover',
  },
  saveButton: {
    fontSize: 20,
  },
});
