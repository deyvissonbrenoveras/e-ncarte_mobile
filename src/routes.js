import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SelectStore from '~/pages/SelectStore';

function Routes() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Selecione a loja' component={SelectStore} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default Routes;
