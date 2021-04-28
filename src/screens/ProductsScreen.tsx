/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { ProductContext } from '../context/ProductContext';
import { StackScreenProps } from '@react-navigation/stack';
import { ProductsStackParams } from '../navigation/ProductsNavigator';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<ProductsStackParams, 'ProductsScreen'> { }

export const ProductsScreen = ({ navigation }: Props) => {

  const { products, loadProducts } = useContext(ProductContext);
  const { logOut } = useContext(AuthContext);


  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.addButton}
          onPress={() => navigation.navigate('ProductScreen', {})}
        >
          <Icon name={'cart-plus'} size={18} color={'#2a2a2a'} />
          <Text>
            Agregar
          </Text>
        </TouchableOpacity>
      ),
    });
  }, []);

  const loadProductsFromBackend = async () => {
    setIsRefreshing(true);
    await loadProducts();
    setIsRefreshing(false);
  };

  const onLogout = () => {
    logOut();
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={products}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => navigation.navigate(
                'ProductScreen',
                {
                  id: item._id,
                  name: item.nombre,
                }
              )}
            >
              <Text style={styles.productName}>
                {item.nombre}
              </Text>
            </TouchableOpacity>

          )}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={loadProductsFromBackend}
            />
          }
        />
      </View>
      <View style={styles.containerLogout} >
        <TouchableOpacity
          activeOpacity={0.4}
          style={styles.buttonBack}
          onPress={onLogout}
        >
          <Text style={styles.textLogut}>Cerrar sesión</Text>
          <Icon name={'sign-out-alt'} size={25} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  productName: {
    fontSize: 20,
  },
  itemSeparator: {
    borderBottomWidth: 5,
    marginVertical: 5,
    borderBottomColor: 'rgba(0,0,0,0.2)',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  buttonBack: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 120,
    paddingVertical: 4,
    marginBottom: 10,
  },
  containerLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  textLogut: {
    fontSize: 15,
    color: 'white',
  },
});
