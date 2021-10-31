import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { images, fonts, colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text>My Starter Kit</Text>
    </View>
  );
};

export default Home;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});
