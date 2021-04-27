/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Alert,
} from 'react-native';
import { WhiteLogo } from '../components/WhiteLogo';
import { loginStyles } from '../theme/loginTheme';
import { useForm } from '../hooks/useForm';
import { StackScreenProps } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';

interface Props extends StackScreenProps<any, any> { }

export const RegisterScreen = ({ navigation }: Props) => {

  const intitalState = {
    name: '',
    email: '',
    password: '',
  };

  const { email, password, name, onChange } = useForm(intitalState);

  const { signUp, errorMessage, removeError } = useContext(AuthContext);

  useEffect(() => {
    if (errorMessage.length === 0) { return; }
    Alert.alert(
      'Error de registro', errorMessage, [{
        text: 'Ok',
        onPress: () => removeError(),
      }]);
  }, [errorMessage]);

  const onRegister = () => {
    signUp({ nombre: name, correo: email, password });
    Keyboard.dismiss();
  };

  return (
    <>
      {/* Keiboard avoid view */}

      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#0e3c79' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={loginStyles.formContainer}>
          <WhiteLogo />
          <Text style={loginStyles.title}>Crear cuenta</Text>
          <Text style={loginStyles.label}>Nombre: </Text>
          <TextInput
            placeholder={'Ingresar nombre'}
            placeholderTextColor={'rgba(255,255,255,0.4)'}
            underlineColorAndroid={'white'}
            style={[
              loginStyles.inputField,
              Platform.OS === 'ios' && loginStyles.inputFieldIos,
            ]}
            selectionColor={'#da8943'}
            autoCapitalize={'words'}
            autoCorrect={false}
            onChangeText={(value) => onChange(value, 'name')}
            value={name}
          />
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
            secureTextEntry={true}
          />

          {/* Boton Login */}

          <View style={loginStyles.buttonContainer}>
            <TouchableOpacity
              activeOpacity={0.4}
              style={loginStyles.button}
              onPress={onRegister}
            >
              <Text style={loginStyles.buttonText}>Crear cuenta</Text>
            </TouchableOpacity>

          </View>

          {/* Boton regresar */}

          <TouchableOpacity
            activeOpacity={0.4}
            style={loginStyles.buttonBack}
            onPress={() => navigation.replace('LoginScreen')}
          >
            <Icon name={'arrow-circle-left'} size={50} color={'white'} />
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </>
  );
};
