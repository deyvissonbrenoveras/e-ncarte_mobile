import React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import styles from './styles';

const Loading = () => (
  <ActivityIndicator
    animating
    color='rgb(237,47,87)'
    size={36}
    style={styles.loading}
  />
);

export default Loading;
