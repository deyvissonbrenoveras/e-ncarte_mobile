import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// import Icon from 'react-native-vector-icons/MaterialIcons';

import SelectStore from '~/pages/SelectStore';
import ShowcaseStore from '~/pages/showcase/Store';
import ShowcaseInfo from '~/pages/showcase/Info';
import ShowcaseCart from '~/pages/showcase/Cart';

function Routes() {
  const Stack = createStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  function ShowcaseTabScreen({ ...props }) {
    return (
      <Tab.Navigator {...props}>
        <Tab.Screen name='store' component={ShowcaseStore} />
        <Tab.Screen name='info' component={ShowcaseInfo} />
        <Tab.Screen name='cart' component={ShowcaseCart} />
      </Tab.Navigator>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: 'Roboto-Light',
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name='selectStore'
          component={SelectStore}
          options={{ title: 'Selecionar loja' }}
        />
        <Stack.Screen
          name='showcase'
          component={ShowcaseTabScreen}
          options={({ route }) => ({
            title: route.params.storeName,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
