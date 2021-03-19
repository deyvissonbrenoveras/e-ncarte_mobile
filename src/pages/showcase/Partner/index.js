import React from 'react';
import { Text, View, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';

import styles from './styles';

function Partner({ route }) {
  const { partner } = route.params;

  return (
    <View style={styles.container}>
      {partner && (
        <>
          {partner.logo && (
            <Image
              source={{ uri: partner.logo.url }}
              style={styles.partnerLogo}
            />
          )}
          <Text style={styles.partnerName}>{partner.name}</Text>
          {partner.site.length > 0 && (
            <>
              <Text style={styles.subtitle}>Endereço</Text>
              <TouchableOpacity
                onPress={() => {
                  Linking.openURL(partner.site);
                }}
                style={styles.site}
              >
                <Icon name='link' size={20} />
                <Text numberOfLines={1} style={styles.siteText}>
                  {partner.site}
                </Text>
              </TouchableOpacity>
            </>
          )}
          {(partner.facebook || partner.instagram || partner.whatsapp) && (
            <>
              <Text style={styles.subtitle}>Redes sociais</Text>
              <View style={styles.socialNetworks}>
                {partner.facebook ? (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.canOpenURL(`facebook://${partner.facebook}`).then(
                        (supported) => {
                          if (supported) {
                            return Linking.openURL(
                              `facebook://${partner.facebook}`
                            );
                          }

                          return Linking.openURL(
                            `https://facebook.com/${partner.facebook}`
                          );
                        }
                      );
                    }}
                  >
                    <Icon name='facebook' size={40} style={styles.facebook} />
                  </TouchableOpacity>
                ) : null}
                {partner.instagram ? (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.canOpenURL(
                        `instagram://${partner.instagram}`
                      ).then((supported) => {
                        if (supported) {
                          return Linking.openURL(
                            `instagram://${partner.instagram}`
                          );
                        }

                        return Linking.openURL(
                          `https://instagram.com/${partner.instagram}`
                        );
                      });
                    }}
                  >
                    <Icon name='instagram' size={40} style={styles.instagram} />
                  </TouchableOpacity>
                ) : null}
                {partner.whatsapp ? (
                  <TouchableOpacity
                    onPress={() => {
                      Linking.canOpenURL(
                        `whatsapp://send?phone=${partner.whatsapp}`
                      ).then((supported) => {
                        if (supported) {
                          return Linking.openURL(
                            `whatsapp://send?phone=${partner.whatsapp}`
                          );
                        }

                        return Linking.openURL(
                          `https://api.whatsapp.com/send?phone=${partner.whatsapp}`
                        );
                      });
                    }}
                  >
                    <Icon name='whatsapp' size={40} style={styles.whatsapp} />
                  </TouchableOpacity>
                ) : null}
              </View>
            </>
          )}

          {partner.customizableField ? (
            <WebView
              style={styles.customizableField}
              source={{ html: partner.customizableField }}
            />
          ) : null}
        </>
      )}
    </View>
  );
}

export default Partner;
