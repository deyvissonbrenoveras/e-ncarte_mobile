import React, { useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, ScrollView, Image, Linking } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Loading from '~/components/Loading';
import RouteParamsContext from '~/services/RouteParamsContext';
import { loadRequest } from '~/store/modules/showcase/actions';
import styles from './styles';

const Info = () => {
  const dispatch = useDispatch();
  const { showcase: store, loading } = useSelector((state) => state.showcase);

  const { storeURL } = useContext(RouteParamsContext).params.params;

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(loadRequest(storeURL));
    }
  }, [isFocused]);
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {store.logo && (
            <Image
              source={{ uri: store.logo.url }}
              style={styles.showcaseLogo}
            />
          )}
          <Text style={styles.showcaseName}>{store.name}</Text>
          {(store.facebook.length > 0 ||
            store.instagram.length > 0 ||
            store.whatsapp.length > 0) && (
            <>
              <Text style={styles.subtitle}>Redes sociais</Text>
              <View style={styles.socialNetworks}>
                {store.facebook.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.canOpenURL(`facebook://${store.facebook}`).then(
                        (supported) => {
                          if (supported) {
                            return Linking.openURL(
                              `facebook://${store.facebook}`
                            );
                          }

                          return Linking.openURL(
                            `https://facebook.com/${store.facebook}`
                          );
                        }
                      );
                    }}
                  >
                    <Icon name='facebook' size={40} style={styles.facebook} />
                  </TouchableOpacity>
                )}
                {store.instagram.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.canOpenURL(`instagram://${store.instagram}`).then(
                        (supported) => {
                          if (supported) {
                            return Linking.openURL(
                              `instagram://${store.instagram}`
                            );
                          }

                          return Linking.openURL(
                            `https://instagram.com/${store.instagram}`
                          );
                        }
                      );
                    }}
                  >
                    <Icon name='instagram' size={40} style={styles.instagram} />
                  </TouchableOpacity>
                )}
                {store.whatsapp.length > 0 && (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.canOpenURL(
                        `whatsapp://send?phone=${store.whatsapp}`
                      ).then((supported) => {
                        if (supported) {
                          return Linking.openURL(
                            `whatsapp://send?phone=${store.whatsapp}`
                          );
                        }

                        return Linking.openURL(
                          `https://api.whatsapp.com/send?phone=${store.whatsapp}`
                        );
                      });
                    }}
                  >
                    <Icon name='whatsapp' size={40} style={styles.whatsapp} />
                  </TouchableOpacity>
                )}
              </View>
            </>
          )}
          {store.address && store.city ? (
            <>
              <Text style={styles.subtitle}>Endereço</Text>
              <View style={styles.address}>
                <Text style={styles.addressText}>
                  {`${store.address}, ${store.city.name} - ${store.city.state.uf}.`}
                </Text>
              </View>
            </>
          ) : null}
        </>
      )}
    </ScrollView>
  );
};

export default Info;
