import React, { useEffect } from 'react';
import { View, StatusBar, TouchableOpacity } from 'react-native';
import { Home, Details, Settings } from './src/screens';
import { colors } from 'res';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setNavigation } from '~/utils/navigation';
import { MyTabBar } from '~/components';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon } from './src/components';
import AsyncStorage from '@react-native-community/async-storage';
import { navigation } from './src/utils/navigation';

const RootStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const clean = () => {
  AsyncStorage.removeItem('removedWords');
  navigation.navigate('Word');
};

const TabStack = () => (
  <Tabs.Navigator
    // eslint-disable-next-line react/jsx-no-bind
    tabBar={(props) => (
      <MyTabBar
        {...props}
        icons={['home-outline', 'information-circle-outline']}
        activeIcons={['home', 'information-circle']}
      />
    )}
    screenOptions={{
      headerStyle: styles.headerStyle,
      headerTitleStyle: styles.headerTitleStyle,
      tabBarStyle: styles.tabBarStyle,
      lazy: false,
    }}>
    <Tabs.Screen name="Word" component={Home} />
    <Tabs.Screen name="Learned Words" component={Settings} />
  </Tabs.Navigator>
);

const App = () => {
  useEffect(() => {
    RNBootSplash.hide({ duration: 250 });
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar animated translucent backgroundColor={'transparent'} barStyle="light-content" />
      <NavigationContainer ref={setNavigation}>
        <RootStack.Navigator
          screenOptions={{
            presentation: 'modal',
            headerStyle: styles.headerStyle,
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleContainerStyle: styles.headerTitleContainerStyle,
            cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
            gestureEnabled: true,
            cardOverlayEnabled: true,
          }}>
          <RootStack.Screen
            component={TabStack}
            name="Main"
            options={{ headerShown: false, cardStyle: styles.cardStyle }}
          />
          <RootStack.Screen
            component={Details}
            name="Details"
            options={{ headerLeft: null, headerTitleAlign: 'left' }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    backgroundColor: colors.secondary,
    shadowColor: colors.secondary,
  },
  headerTitleContainerStyle: {
    marginLeft: '20@s',
  },
  headerTitleStyle: {
    color: '#fff',
    fontFamily: 'Avenir',
    fontWeight: 'bold',
    fontSize: '25@s',
    textTransform: 'capitalize',
  },
  cardStyle: {
    backgroundColor: '#000',
  },
});
