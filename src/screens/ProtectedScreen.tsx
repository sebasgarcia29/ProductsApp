import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { AuthContext } from '../context/AuthContext';


export const ProtectedScreen = () => {

  const { user, token, logOut } = useContext(AuthContext);

  const onLogout = () => {
    logOut();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ProtectedScreen</Text>

      <TouchableOpacity
        activeOpacity={0.4}
        style={styles.buttonBack}
        onPress={onLogout}
      >
        <Icon name={'times-circle'} size={60} color={'red'} />
      </TouchableOpacity>

      <Text style={styles.formUser}>
        {JSON.stringify(user, null, 5)}
      </Text>
      <Text style={styles.formToken}>
        {JSON.stringify(token, null, 5)}
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonBack: {

  },
  formUser: {
    fontSize: 18,
    textAlign: 'justify',
    marginHorizontal: 20,
    marginBottom: 40,
  },
  formToken: {
    textAlign: 'justify',
    marginHorizontal: 20,
    marginVertical: 10,
  },

});
