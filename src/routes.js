import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '~/styles/theme';
// import Icon from 'react-native-vector-icons/MaterialIcons';

import SelectStore from '~/pages/SelectStore';
import ShowcaseStore from '~/pages/showcase/Store';
import ShowcaseInfo from '~/pages/showcase/Info';
import ShowcaseCart from '~/pages/showcase/Cart';
import ShowcasePartner from '~/pages/showcase/Partner';

function Routes() {
  const Stack = createStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  function ShowcaseTabScreen() {
    return (
      <Tab.Navigator tabBarOptions={{ showIcon: true, showLabel: false }}>
        <Tab.Screen
          name='store'
          component={ShowcaseStore}
          options={{
            tabBarIcon: () => (
              <Icon name='store' color={theme.colors.encarte} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name='info'
          component={ShowcaseInfo}
          options={{
            tabBarIcon: () => (
              <Icon name='info' color={theme.colors.encarte} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name='cart'
          component={ShowcaseCart}
          options={{
            tabBarIcon: () => (
              <Icon
                name='shopping-cart'
                color={theme.colors.encarte}
                size={20}
              />
            ),
          }}
        />
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
            title: route.params.params.storeName,
          })}
        />
        <Stack.Screen
          name='partner'
          component={ShowcasePartner}
          options={({ route }) => ({
            title: route.params.partner.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
