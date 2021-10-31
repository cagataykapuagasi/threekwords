import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'mobx-react';
import { Home } from './src/screens';
import { colors } from 'res';
import RNBootSplash from 'react-native-bootsplash';
import { store } from './src/store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { setNavigation } from '~/utils/navigation';
import { Icon, TabIcon, TabLabel } from '~/components';

const RootStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

const TabStack = () => (
  <Tabs.Navigator screenOptions={{ headerShown: false }}>
    <Tabs.Screen
      name="Home"
      component={Home}
      options={{
        tabBarIcon: (fields) => <TabIcon fields={fields} type="ionicons" icon="home" />,
        tabBarLabel: (fields) => <TabLabel label={'Home'} fields={fields} />,
      }}
    />
    <Tabs.Screen
      name="Home2"
      component={Home}
      options={{
        tabBarIcon: (fields) => <TabIcon fields={fields} type="ionicons" icon="settings" />,
        tabBarLabel: (fields) => <TabLabel label={'Profile'} fields={fields} />,
      }}
    />
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
      <NavigationContainer ref={setNavigation}>
        <RootStack.Navigator mode="modal">
          <RootStack.Screen component={TabStack} name="Main" options={{ headerShown: false }} />
          <RootStack.Screen component={Home} name="SelectForm" options={{ headerShown: false }} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  scene: {
    backgroundColor: colors.background,
  },
  tab: {
    backgroundColor: colors.lightGray,
  },
});
