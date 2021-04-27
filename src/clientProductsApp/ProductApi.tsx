import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://cafe-rn-sebas.herokuapp.com';

const productApi = axios.create({ baseURL });

productApi.interceptors.request.use(

  async(config) => {
    const token = await AsyncStorage.getItem('token123');
    if (token) {
      config.headers['x-token'] = token;
    }
    return config;
  }
);


export default productApi;
