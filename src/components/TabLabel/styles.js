import { StyleSheet, Dimensions } from 'react-native';
import { colors } from 'res';

const styles = StyleSheet.create({
  active: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    letterSpacing: -0.40625,
    color: '#000',
  },
  inActive: {
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 15,
    textAlign: 'center',
    letterSpacing: -0.40625,
    color: colors.placeholder,
  },
});

export default styles;
