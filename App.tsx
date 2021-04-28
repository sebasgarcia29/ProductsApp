import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigation/StackNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductContext';

const AppState = ({ children }: any) => {
  return (
    <AuthProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </AuthProvider>
  );
};


const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
