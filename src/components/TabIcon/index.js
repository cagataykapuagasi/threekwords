import React from 'react';
import { Animated, View } from 'react-native';
import { colors } from 'res';
import Icon from '../Icon';

const TabIcon = ({ fields: { focused }, icon, ...props }) => {
  const color = focused ? colors.primary : colors.lightGray;
  return <Icon name={icon} size={22} color={color} {...props} />;
};

export default TabIcon;
