import React from 'react';
import { Text } from 'react-native';
import styles from './styles';

export default ({ children, style, ...props }) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};
