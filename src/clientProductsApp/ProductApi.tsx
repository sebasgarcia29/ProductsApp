import axios from 'axios';

const baseURL = 'https://cafe-rn-sebas.herokuapp.com';

const productApi = axios.create({ baseURL });


export default productApi;
