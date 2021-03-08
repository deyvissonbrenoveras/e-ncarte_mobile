import React, { useEffect } from 'react';
import { View, Text, Image } from 'react-native';

import logo from '~/assets/images/logo.webp';

import styles from './styles';

function Header(props) {
  const { children } = props;
  useEffect(() => {
    console.tron.log(props);
  }, [props]);
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <Text style={styles.headerTitleStyle}>{children}</Text>
    </View>
  );
}

export default Header;
