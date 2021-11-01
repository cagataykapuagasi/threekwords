import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { images, fonts, colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon, Text } from '~/components';
import { words as _words } from 'res';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { getWordInformation } from '~/api/Word';

const Settings = ({ params }) => (
  <View style={styles.container}>
    <Text>Settings</Text>
  </View>
);

export default Settings;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: '20@s',
  },
});
