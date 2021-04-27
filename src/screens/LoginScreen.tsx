/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import { Background } from '../components/Background';
import {
  View,
  Text,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  Alert,
} from 'react-native';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }

export const LoginScreen = ({ navigation }: Props) => {

  const initialState = {
    email: 'test1@test.com',
    password: '123456',
  };


  const { signIn, errorMessage, removeError } = useContext(AuthContext);

  console.log({ errorMessage });

  const { email, password, onChange } = useForm(initialState);

  useEffect(() => {
    if (errorMessage.length === 0) { return; }
    Alert.alert(
      'Error de inicio de sesión', errorMessage, [{
        text: 'Ok',
        onPress: () => removeError(),
      }]);
  }, [errorMessage]);

  const onLogin = () => {
    signIn({ correo: email, password });
    Keyboard.dismiss();
  };

  return (
    <>
      {/* Background */}
      <Background />
      {/* Keiboard avoid view */}

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Login</Text>
          <Text style={loginStyles.label}>Email: </Text>
          <TextInput
            placeholder={'Ingresar email'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            keyboardType={'email-address'}
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor={'#da8943'}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'email')}
            value={email}
            onSubmitEditing={onLogin}
          />
          <Text style={loginStyles.label}>Password: </Text>
          <TextInput
            placeholder={'******'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor={'#da8943'}
            autoCapitalize={'none'}
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'password')}
            value={password}
            onSubmitEditing={onLogin}
            secureTextEntry={true}
          />

          {/* Boton Login */}

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={loginStyles.button}
              onPress={onLogin}
            >
              <Text style={loginStyles.buttonText}>Login</Text>
            </TouchableOpacity>

          </View>


          {/* Crear Cuenta */}

          <View style={loginStyles.newUserContainer}>
            <TouchableOpacity
              activeOpacity={0.4}
              onPress={() => navigation.replace('RegisterScreen')}
            >
              <Text style={{
                ...loginStyles.buttonText,
                color: '#f4d580',
                fontWeight: '500',
              }}>Nueva cuenta</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
