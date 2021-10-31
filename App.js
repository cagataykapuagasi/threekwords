import React, { useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { Provider } from 'mobx-react';
import { Home } from './src/screens';
import { colors } from 'res';
import RNBootSplash from 'react-native-bootsplash';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setNavigation } from '~/utils/navigation';
import { Icon, TabIcon, TabLabel, MyTabBar } from '~/components';
import { ScaledSheet } from 'react-native-size-matters';

const RootStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const TabStack = () => (
  <Tabs.Navigator
    // eslint-disable-next-line react/jsx-no-bind
    tabBar={(props) => <MyTabBar {...props} icons={['home', 'settings']} />}
    screenOptions={{ headerStyle: styles.headerStyle, headerTitleStyle: styles.headerTitleStyle }}
    lazy={false}
    tabBarOptions={{ showLabel: false }}>
    <Tabs.Screen name="Home" component={Home} />
    <Tabs.Screen name="Home2" component={Home} />
  </Tabs.Navigator>
);

const App = () => {
  useEffect(() => {
    store
      .init()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
      .finally(() => RNBootSplash.hide({ duration: 250 }));
  }, []);

  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" />
      <NavigationContainer ref={setNavigation}>
        <RootStack.Navigator screenOptions={{ presentation: 'modal' }}>
          <RootStack.Screen component={TabStack} name="Main" options={{ headerShown: false }} />
          <RootStack.Screen component={Home} name="SelectForm" options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = ScaledSheet.create({
  headerStyle: {
    backgroundColor: '#000',
    shadowColor: colors.secondaryDark,
  },
  headerTitleStyle: {
    color: '#fff',
  },
});
