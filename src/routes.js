import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '~/styles/theme';
import RouteParamsContext from '~/services/RouteParamsContext';

import Header from '~/components/Header';

import SelectStore from '~/pages/SelectStore';
import ShowcaseStore from '~/pages/showcase/Store';
import ShowcaseInfo from '~/pages/showcase/Info';
import ShowcaseCart from '~/pages/showcase/Cart';
import ShowcasePartner from '~/pages/showcase/Partner';
import ShowcaseProduct from '~/pages/showcase/Product';

function Routes() {
  const Stack = createStackNavigator();
  const Tab = createMaterialTopTabNavigator();
  function ShowcaseTabScreen({ route }) {
    return (
      <RouteParamsContext.Provider value={route}>
        <Tab.Navigator
          tabBarOptions={{
            showIcon: true,
            showLabel: false,
            indicatorStyle: { backgroundColor: theme.colors.encarte },
          }}
        >
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
      </RouteParamsContext.Provider>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            height: 50,
          },
          headerTitle: (props) => <Header {...props} />,
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
        <Stack.Screen
          name='product'
          component={ShowcaseProduct}
          options={() => ({
            title: 'Visualizar produto',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
