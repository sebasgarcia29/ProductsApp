import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { PacmanIndicator } from 'react-native-indicators';

export const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <PacmanIndicator size={200} color={'#f4d580'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
