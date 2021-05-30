import React from 'react';
import 'react-native-gesture-handler';
import './config/ReactotronConfig';

import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

import { StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import FlashMessage from 'react-native-flash-message';
import { store, persistor } from '~/store';
import App from './App';
import theme from './styles/theme';

const Index = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <StatusBar barStyle='light-content' backgroundColor='rgb(237,47,87)' />
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    </PersistGate>
    <FlashMessage position='top' />
  </Provider>
);

export default Index;
