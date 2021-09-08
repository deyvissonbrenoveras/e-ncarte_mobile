import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import styles from './styles';

function CarouselSnapButton({ name, onPress }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Icon name={name} style={styles.icon} size={8} />
    </TouchableOpacity>
  );
}

export default CarouselSnapButton;
