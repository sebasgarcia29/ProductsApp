import React, { createContext, useReducer } from 'react';
import productApi from '../clientProductsApp/ProductApi';
import { Usuario, LoginResponse, LoginData } from '../interfaces/appInterfaces';
import { authReducer, AuthState } from './authReducer';

type AuthContextProps = {
  errorMessage: string;
  token: string | null;
  user: Usuario | null;
  status: 'checking' | 'authenticated' | 'not-authenticated';
  signIn: (LoginData: LoginData) => void;
  signUp: () => void;
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
    } catch (error) {
      dispatch({ type: 'addError', payload: error.response.data.msg || 'Informacion incorrecta' });
    }

  };

  const signUp = () => { };
  const logOut = async () => { };

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


