import React from 'react';
import 'react-native-gesture-handler';
import './config/ReactotronConfig';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { StatusBar } from 'react-native';
import { store, persistor } from '~/store';

import App from './App';

const Index = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StatusBar barStyle='light-content' backgroundColor='rgb(237,47,87)' />
      <App />
    </PersistGate>
  </Provider>
);

export default Index;
