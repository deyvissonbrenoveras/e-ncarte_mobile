import React from 'react';
import { useSelector } from 'react-redux';
import { View, Text, ScrollView, Image, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Loading from '~/components/Loading';
import styles from './styles';

const Info = () => {
  const { showcase: store, loading } = useSelector((state) => state.showcase);
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
          {store.facebook.length > 0 ||
            store.instagram.length > 0 ||
            (store.whatsapp.length > 0 && (
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
                        Linking.canOpenURL(
                          `instagram://${store.instagram}`
                        ).then((supported) => {
                          if (supported) {
                            return Linking.openURL(
                              `instagram://${store.instagram}`
                            );
                          }

                          return Linking.openURL(
                            `https://instagram.com/${store.instagram}`
                          );
                        });
                      }}
                    >
                      <Icon
                        name='instagram'
                        size={40}
                        style={styles.instagram}
                      />
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
            ))}
          <Text style={styles.subtitle}>Endereço</Text>
          <View style={styles.address}>
            <Text style={styles.addressText}>
              {`${store.address}, ${store.city}.`}
            </Text>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Info;
