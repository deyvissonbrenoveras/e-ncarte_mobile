import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, FlatList, Image, Text } from 'react-native';

import { TextInput, useTheme, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Loading from '~/components/Loading';

import { loadStoresRequest } from '~/store/modules/store/actions';
import slugify from '~/util/slugify';

import styles from './styles';

function SelectStore({ navigation }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { stores, loading } = useSelector((state) => state.store);

  const [storesFound, setStoresFound] = useState(null);

  useEffect(() => {
    dispatch(loadStoresRequest());
  }, []);

  function handleSearch(value) {
    if (value.length === 0) {
      setStoresFound(null);
    } else {
      const storeSearch = slugify(value).toUpperCase();
      const strs = stores.filter(
        (store) =>
          slugify(store.name).toUpperCase().includes(storeSearch) ||
          slugify(store.url).toUpperCase().includes(storeSearch)
      );
      setStoresFound(strs);
    }
  }
  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FlatList
            numColumns={2}
            data={storesFound !== null ? storesFound : stores}
            keyExtractor={(item) => String(item.id)}
            ListHeaderComponent={
              <TextInput
                label='Buscar lojas'
                left={
                  <TextInput.Icon
                    name={() => (
                      <Icon name='search' size={20} color={colors.encarte} />
                    )}
                    onPress={() => {}}
                  />
                }
                theme={{ colors: { primary: colors.encarte } }}
                onChangeText={handleSearch}
                returnKeyType='search'
                style={styles.search}
              />
            }
            renderItem={({ item }) => (
              <Card
                style={styles.card}
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
                <Image
                  source={{ uri: item.logo.url }}
                  style={styles.cardAvatar}
                />
                <Text style={styles.cardText}>{item.name}</Text>
              </Card>
            )}
          />
        </>
      )}
    </View>
  );
}

export default SelectStore;
