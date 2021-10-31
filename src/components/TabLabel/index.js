import React from 'react';
import {Animated, View} from 'react-native';
import {colors} from 'res';
import Text from '../Text';
import styles from './styles';

const TabIcon = ({fields: {focused}, label}) => {
  const style = styles[focused ? 'active' : 'inActive'];
  return <Text style={style}>{label}</Text>;
};

export default TabIcon;
