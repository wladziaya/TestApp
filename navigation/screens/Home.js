import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Button title="Barcode Scanner" onPress={() => navigation.navigate('Barcode Scanner')} />
      <Button title="Wi-Fi Scanner" onPress={() => navigation.navigate('Wi-Fi Scanner')} />
      <Button title="Bluetooth Scanner" onPress={() => navigation.navigate('Bluetooth Scanner')} />
      <Button title="Map" onPress={() => navigation.navigate('Map')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    padding: 20,
    paddingVertical:'60%'
  },
});

export default Home;
