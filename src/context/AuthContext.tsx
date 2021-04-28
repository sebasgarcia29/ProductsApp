import React, { createContext, useEffect, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import productApi from '../clientProductsApp/ProductApi';
import { Usuario, LoginResponse, LoginData, RegisterData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from '../reducers/authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signIn: (LoginData: LoginData) => void;
  signUp: (RegisterData: RegisterData) => void;
  logOut: () => void;
  removeError: () => void;
}

const authInicialState: AuthState = {
  status: 'checking',
  token: null,
  user: null,
  errorMessage: '',
};

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {

  const [state, dispatch] = useReducer(authReducer, authInicialState);


  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token123');
    if (!token) {
      return dispatch({ type: 'notAuthenticated' });
    }
    //Si hay token
    const resp = await productApi.get('/api/auth/');
    if (resp.status !== 200) {
      return dispatch({ type: 'notAuthenticated' });
    }
    await AsyncStorage.setItem('token123', resp.data.token);
    dispatch({
      type: 'signUp',
      payload: {
        token: resp.data.token,
        user: resp.data.usuario,
      },
    });
  };

  const signIn = async ({ correo, password }: LoginData) => {

    try {
      const resp = await productApi.post<LoginResponse>('/api/auth/login', { correo, password });
      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });
      await AsyncStorage.setItem('token123', resp.data.token);

    } catch (error) {
      dispatch({ type: 'addError', payload: error.response.data.msg || 'Informacion incorrecta' });
    }

  };

  const signUp = async ({ nombre, correo, password }: RegisterData) => {
    try {
      const resp = await productApi.post<LoginResponse>('/api/usuarios', { nombre, correo, password });
      dispatch({
        type: 'signUp',
        payload: {
          token: resp.data.token,
          user: resp.data.usuario,
        },
      });
      await AsyncStorage.setItem('token123', resp.data.token);

    } catch (error) {
      console.log(error.response.data.errors[0].msg);
      dispatch({ type: 'addError', payload: error.response.data.errors[0].msg || 'Error, comuniquese con el Administrador' });
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('token123');
    dispatch({ type: 'logout' });
  };

  const removeError = () => {
    dispatch({ type: 'removeError' });
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      signUp,
      signIn,
      logOut,
      removeError,
    }}>
      { children}
    </AuthContext.Provider>
  );
};


