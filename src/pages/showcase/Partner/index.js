import React, { useState } from 'react';
import {
  Text,
  View,
  Image,
  Linking,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';
import { Button, Dialog, Portal } from 'react-native-paper';

import styles from './styles';

function Partner({ route, navigation }) {
  const { partner } = route.params;

  const [modalVisible, setModalVisible] = useState(true);
  const [productModal, setProductModal] = useState(null);

  function HeaderComponent() {
    return (
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
                    Linking.canOpenURL(`instagram://${partner.instagram}`).then(
                      (supported) => {
                        if (supported) {
                          return Linking.openURL(
                            `instagram://${partner.instagram}`
                          );
                        }

                        return Linking.openURL(
                          `https://instagram.com/${partner.instagram}`
                        );
                      }
                    );
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
        {partner.products && partner.products.length > 0 && (
          <Text style={styles.catalogSubtitle}>CATÁLOGO DE PRODUTOS</Text>
        )}
      </>
    );
  }
  function FooterComponent() {
    return (
      <>
        {partner.customizableField ? (
          <WebView
            style={styles.customizableField}
            source={{ html: partner.customizableField }}
          />
        ) : null}
      </>
    );
  }
  return (
    <View style={styles.container}>
      {partner && (
        <>
          {partner.products && partner.products.length > 0 ? (
            <>
              <FlatList
                ListHeaderComponent={HeaderComponent}
                ListFooterComponent={FooterComponent}
                numColumns={3}
                data={partner.products}
                keyExtractor={(item) => String(item.id)}
                style={styles.featuredProductsList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.featuredProductItem}
                    onPress={() => {
                      setProductModal(item);
                      setModalVisible(true);
                    }}
                  >
                    <Image
                      source={{ uri: item.image.url }}
                      style={styles.featuredProductImage}
                    />
                  </TouchableOpacity>
                )}
              />
              {productModal && (
                <Portal>
                  <Dialog
                    visible={modalVisible}
                    onDismiss={() => {
                      setModalVisible(false);
                    }}
                    style={styles.productModal}
                  >
                    <Button
                      onPress={() => {
                        setModalVisible(false);
                      }}
                      style={styles.modalCloseButton}
                    >
                      <Icon name='close' size={20} />
                    </Button>
                    <View style={styles.productModalContent}>
                      <FlatList
                        ListHeaderComponent={
                          <>
                            <Image
                              source={{ uri: productModal.image.url }}
                              style={styles.productModalImage}
                            />
                            <Text style={styles.productModalName}>
                              {productModal.name}
                            </Text>

                            {productModal.stores &&
                            productModal.stores.length > 0 ? (
                              <Text style={styles.catalogSubtitle}>
                                Encontre este e outros produtos em:
                              </Text>
                            ) : null}
                          </>
                        }
                        numColumns={2}
                        data={productModal.stores}
                        keyExtractor={(item) => String(item.id)}
                        style={styles.productModalStore}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.productModalItem}
                            onPress={() => {
                              setModalVisible(false);
                              navigation.navigate('showcase', {
                                screen: 'store',
                                params: {
                                  storeId: item.id,
                                  storeURL: item.url,
                                  storeName: item.name,
                                  productToLoad: productModal,
                                },
                              });
                            }}
                          >
                            <Image
                              source={{ uri: item.logo.url }}
                              style={styles.featuredProductImage}
                            />
                            <Text style={styles.productModalStoreName}>
                              {item.name}
                            </Text>
                          </TouchableOpacity>
                        )}
                      />
                    </View>
                  </Dialog>
                </Portal>
              )}
            </>
          ) : (
            <>
              <HeaderComponent />
              <FooterComponent />
            </>
          )}
        </>
      )}
    </View>
  );
}

export default Partner;
