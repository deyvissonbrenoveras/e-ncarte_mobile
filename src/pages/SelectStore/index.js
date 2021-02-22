import React, { useEffect } from 'react';

import { View, FlatList, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Card } from 'react-native-paper';
import styles from './styles';
import { loadStoresRequest } from '~/store/modules/store/actions';

function SelectStore({ navigation }) {
  const dispatch = useDispatch();
  const { stores } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(loadStoresRequest());
  }, []);
  return (
    <View>
      <FlatList
        data={stores}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card
            onPress={() => {
              navigation.navigate('showcase', {
                screen: 'store',
                params: {
                  storeId: item.id,
                  storeURL: item.url,
                  storeName: item.name,
                },
              });
            }}
          >
            <Card.Title
              title={item.name}
              titleStyle={styles.cardTitle}
              imageProps={{ resizeMode: 'contain' }}
              left={(props) => (
                <Image
                  {...props}
                  source={{ uri: item.logo.url }}
                  style={styles.cardAvatar}
                />
              )}
            />
          </Card>
        )}
      />
    </View>
  );
}

export default SelectStore;
