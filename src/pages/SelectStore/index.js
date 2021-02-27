import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, Image } from 'react-native';

import { Card } from 'react-native-paper';
import Loading from '~/components/Loading';

import { loadStoresRequest } from '~/store/modules/store/actions';

import styles from './styles';

function SelectStore({ navigation }) {
  const dispatch = useDispatch();
  const { stores, loading } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(loadStoresRequest());
  }, []);
  return (
    <View>
      {loading ? (
        <Loading />
      ) : (
        <>
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
        </>
      )}
    </View>
  );
}

export default SelectStore;
