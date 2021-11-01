import React, { Component } from 'react';
import { colors } from 'res';
import Icon from '../Icon';
import { Animated } from 'react-native';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class TabIcon extends Component {
  scale = new Animated.Value(1);
  translateY = new Animated.Value(0);

  handleAnimation = () => {
    const { focused } = this.props.fields;

    Animated.parallel([
      Animated.spring(this.scale, {
        toValue: focused ? 1.25 : 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.spring(this.translateY, {
        toValue: focused ? -6 : 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  };

  componentDidUpdate() {
    this.handleAnimation();
  }

  componentDidMount() {
    this.handleAnimation();
  }

  render() {
    const color = colors[this.props.fields.focused ? 'white' : 'lightGray'];
    const { scale, translateY } = this;

    return (
      <Animated.View style={{ transform: [{ translateY }] }}>
        <AnimatedIcon
          style={{ transform: [{ scale }] }}
          name={this.props.icon || 'user-o'}
          size={22}
          color={color}
          {...this.props}
        />
      </Animated.View>
    );
  }
}
