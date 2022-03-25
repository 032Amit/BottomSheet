import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Screens from '../navigation/Screens';

const ScreenB = ({navigation}) => {
  const onPress = () => {
    navigation.navigate(Screens.ScreenA);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.btnText}>Take me back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
  },
  button: {
    width: 120,
    padding: 10,
    borderRadius: 10,
    marginVertical: 100,
    backgroundColor: '#000',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScreenB;
