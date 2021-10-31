import React from 'react';
import { colors, width } from 'res';
import { View, Dimensions, Animated, StyleSheet, Pressable } from 'react-native';
import TabIcon from './TabIcon';
import { scale, ScaledSheet } from 'react-native-size-matters';
import LinearGradient from 'react-native-linear-gradient';
import { ifIphoneX } from 'react-native-iphone-x-helper';
import TabManager from './TabManager';

const AnimatedIcon = Animated.createAnimatedComponent(TabIcon);

export function changeTab(i, onPress) {
  const ref = TabManager.getDefault();

  if (ref) {
    ref.changeTab(i, onPress);
  }
}

export default class TabBarItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
    };
  }

  translateY = new Animated.Value(-scale(5));
  translateX = new Animated.Value(-width / 4);

  valueSelector = (selectedIndex) => {
    switch (selectedIndex) {
      case 0:
        return -width / 4;
      case 1:
        return width / 4;
      default:
        return 0;
    }
  };

  componentDidMount() {
    TabManager.register(this);
  }

  changeTab = (selectedIndex, onPress) => {
    const isSuccess = onPress();

    if (!isSuccess) {
      return;
    }

    this.translateY.setValue(0);
    this.setState({ selectedIndex }, () => {
      Animated.parallel(
        [
          Animated.timing(this.translateX, {
            toValue: this.valueSelector(selectedIndex),
            useNativeDriver: true,
            duration: 200,
          }),
          Animated.timing(this.translateY, {
            toValue: -scale(5),
            useNativeDriver: true,
            duration: 500,
          }),
        ],
        {}
      ).start();
    });
  };

  render() {
    const { state, descriptors, navigation, icons } = this.props;
    const { selectedIndex } = this.state;

    return (
      <View style={[styles.container, this.props.style]}>
        {state.routes.map((route, i) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === i;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
              return 'success';
            }
          };

          return (
            <Pressable
              key={i}
              underlayColor={'transparent'}
              style={styles.navItem}
              onPress={() => {
                this.changeTab(i, onPress);
              }}>
              <TabIcon
                fields={{ focused: isFocused, icon: icons[i] }}
                type="ionicons"
                name={icons[i]}
              />
            </Pressable>
          );
        })}

        <Animated.View
          style={[styles.circleShadow, { transform: [{ translateX: this.translateX }] }]}>
          <LinearGradient style={styles.button} colors={['#F17285', '#F26177', colors.primary]} />
        </Animated.View>
      </View>
    );
  }
}

const styles = ScaledSheet.create({
  container: {
    zIndex: 999,
    backgroundColor: colors.secondaryDark,
    ...ifIphoneX(
      {
        height: '70@s',
        paddingBottom: '20@s',
      },
      {
        height: '50@s',
      }
    ),

    borderTopLeftRadius: '30@s',
    borderTopRightRadius: '30@s',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  circleShadow: {
    position: 'absolute',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: -1,
    ...ifIphoneX(
      {
        bottom: '18@s',
      },
      {}
    ),
  },
  button: {
    height: '55@s',
    width: '55@s',
    borderRadius: '50@s',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '5@s',
  },
});
