import React, { useEffect, useMemo, useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  SafeAreaView,
  Dimensions,
} from 'react-native';

import { BorderlessButton } from 'react-native-gesture-handler';
import { useIsFocused } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
import { TextInput, useTheme } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import { showMessage } from 'react-native-flash-message';

import { format, parseISO } from 'date-fns';

import Icon from 'react-native-vector-icons/MaterialIcons';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import slugify from '~/util/slugify';
import { formatPrice } from '~/util/format';
import PriceTypeEnum from '~/util/PriceTypeEnum';

import styles from './styles';
import theme from '~/styles/theme';

import Loading from '~/components/Loading';
import CarouselSnapButton from '~/components/CarouselSnapButton';

import { addProduct } from '~/store/modules/cart/actions';
import { loadRequest } from '~/store/modules/showcase/actions';

const CAROUSEL_SLIDER_WIDTH = Dimensions.get('window').width;
const CAROUSEL_ITEM_WIDTH = CAROUSEL_SLIDER_WIDTH;

function Store({ navigation, route }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { showcase, loading } = useSelector((state) => state.showcase);
  const { storeURL, storeId, productToLoad } = route.params;

  const carousel = useRef(null);

  const [productsFound, setProductsFound] = useState(null);
  const [productLoaded, setProductLoaded] = useState(false);
  const [carouselItems, setCarouselItems] = useState([]);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      dispatch(loadRequest(storeURL));
    }
  }, [isFocused]);

  const store = useMemo(() => {
    // Filter all categories
    let categories;
    let products;
    if (showcase.products) {
      products = showcase.products.map((pdt) => ({
        ...pdt,
        formattedPrice: formatPrice(pdt.price),
      }));

      categories = products
        .reduce((cat, product) => {
          if (product.category) {
            let exists = false;
            for (let i = 0; i < cat.length; i += 1) {
              if (cat[i].id === product.category.id) {
                exists = true;
              }
            }
            if (!exists) {
              cat.push(product.category);
            }
          }
          return cat;
        }, [])
        .sort((a, b) => a.name.localeCompare(b.name));
      categories.push({ id: null, name: 'Outros produtos' });
    }
    categories =
      categories &&
      categories.map((cat) => {
        const editingCategory = { ...cat };
        editingCategory.products = products
          .filter(
            (prod) => (prod.category ? prod.category.id : null) === cat.id
          )
          .sort((a, b) => a.name.localeCompare(b.name));

        return editingCategory;
      });

    // shelfLifeEnd formatting
    const shelfLifeStart = showcase.shelfLifeStart
      ? format(parseISO(showcase.shelfLifeStart.split('T')[0]), 'dd/MM/yyyy')
      : null;

    const shelfLifeEnd = showcase.shelfLifeEnd
      ? format(parseISO(showcase.shelfLifeEnd.split('T')[0]), 'dd/MM/yyyy')
      : null;

    return { ...showcase, products, categories, shelfLifeStart, shelfLifeEnd };
  }, [showcase]);

  useEffect(() => {
    //Carousel items processing
    let carouselItemsTemp = [];
    store.cover &&
      carouselItemsTemp.push(
        <View style={styles.carouselAdvertisementItem}>
          <Image
            style={styles.carouselAdvertisementImg}
            source={{ uri: store.cover ? store.cover.url : '' }}
            alt='cover'
          />
        </View>
      );
    let productsItems = [];
    if (store.products) {
      let featuredProducts = store.products.filter(
        (product) => product.featured
      );
      for (let i = 0; i < featuredProducts.length; i += 2) {
        productsItems.push(
          featuredProducts.length - i === 1 ? (
            <View style={styles.carouselItem}>
              <CarouselProduct product={featuredProducts[i]} />
            </View>
          ) : (
            <View style={styles.carouselItem}>
              <CarouselProduct product={featuredProducts[i]} />
              <CarouselProduct product={featuredProducts[i + 1]} />
            </View>
          )
        );
      }
    }
    carouselItemsTemp = [...carouselItemsTemp, ...productsItems];
    store.secondaryCover &&
      carouselItemsTemp.push(
        <View style={styles.carouselAdvertisementItem}>
          <Image
            style={styles.carouselAdvertisementImg}
            source={{
              uri: store.secondaryCover ? store.secondaryCover.url : '',
            }}
            alt='secondary cover'
          />
        </View>
      );
    setCarouselItems(carouselItemsTemp);
  }, [store]);

  useEffect(() => {
    if (productToLoad && !productLoaded) {
      navigation.navigate('product', {
        product: {
          ...productToLoad,
          formattedPrice: formatPrice(productToLoad.price),
        },
        storeId,
      });
      setProductLoaded(true);
    }
  }, [showcase]);
  function handleSearch(value) {
    if (value.length === 0) {
      setProductsFound(null);
    } else {
      const productSearch = slugify(value).toUpperCase();
      const products = store.products.filter(
        (product) =>
          slugify(product.name).toUpperCase().includes(productSearch) ||
          slugify(product.description).toUpperCase().includes(productSearch)
      );
      setProductsFound(products);
    }
  }
  function ProductItemPrice(params) {
    const { product } = params;

    switch (product.priceType) {
      case PriceTypeEnum.DEFAULT:
        return (
          <Text style={styles.productPrice}>{product.formattedPrice}</Text>
        );
      case PriceTypeEnum.SPECIAL_OFFER:
        return (
          <Text style={styles.specialOfferProductPrice}>OFERTA ESPECIAL</Text>
        );
      case PriceTypeEnum.FEATURED:
        return (
          <Text style={styles.featuredPrice}>{product.formattedPrice}</Text>
        );
      default:
        return (
          <Text style={styles.productPrice}>{product.formattedPrice}</Text>
        );
    }
  }
  function ProductItem({ product }) {
    return (
      <View style={styles.productCard}>
        <TouchableOpacity
          style={{ width: 60 }}
          onPress={() => {
            navigation.navigate('product', {
              product,
              storeId: store.id,
            });
          }}
        >
          <Image
            source={{ uri: product.image.url }}
            style={styles.productImage}
          />
        </TouchableOpacity>
        <View style={styles.productContent}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('product', {
                product,
                storeId: store.id,
              });
            }}
          >
            <Text style={styles.productName}>{product.name}</Text>
          </TouchableOpacity>
          <ProductItemPrice product={product} />
          <TouchableOpacity
            onPress={() => {
              dispatch(addProduct(storeId, product, 1));
              showMessage({
                message: 'O produto foi adicionado ao carrinho',
                type: 'success',
              });
            }}
            style={styles.addCartButton}
          >
            <Icon
              name='add-shopping-cart'
              color={theme.colors.primary}
              size={20}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  function CarouselProduct({ product }) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('product', {
            product,
            storeId: store.id,
          });
        }}
        style={styles.carouselProduct}
      >
        <Image
          source={{ uri: product && product.image.url }}
          alt={product.name}
          style={styles.carouselProductImage}
        />
        <View style={styles.carouselProductInfo}>
          <Text numberOfLines={2} style={styles.carouselProductName}>
            {product.name}
          </Text>
          <Text style={styles.carouselProductPrice}>
            {product.formattedPrice}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  function CarouselComponent() {
    return (
      <>
        <Carousel
          ref={carousel}
          data={carouselItems}
          renderItem={({ item, index }) => item}
          layout={'default'}
          sliderWidth={CAROUSEL_SLIDER_WIDTH}
          itemWidth={CAROUSEL_ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          autoplay
          loop
        />
        <View style={styles.carouselSnapArea}>
          <CarouselSnapButton
            name='arrow-left'
            onPress={() => {
              carousel.current.snapToPrev();
            }}
            style={styles.carouselLeftSnapButton}
          />
          <CarouselSnapButton
            name='arrow-right'
            onPress={() => {
              carousel.current.snapToNext();
            }}
          />
        </View>
      </>
    );
  }

  function ShelfLife(params) {
    const { shelfLifeStart, shelfLifeEnd, align } = params;
    if (!shelfLifeStart || !shelfLifeEnd) {
      return <></>;
    }
    return (
      <Text style={{ ...styles.shelfLife, textAlign: align, fontSize: 10 }}>
        {`PREÇOS VÁLIDOS DE ${shelfLifeStart} ATÉ ${shelfLifeEnd}.`}
      </Text>
    );
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {loading ? (
          <Loading />
        ) : (
          <>
            <FlatList
              data={productsFound !== null ? productsFound : store.categories}
              keyExtractor={(item) => String(item.id)}
              ListHeaderComponent={
                <>
                  <ShelfLife
                    align='right'
                    shelfLifeStart={store.shelfLifeStart}
                    shelfLifeEnd={store.shelfLifeEnd}
                  />
                  {store.partners && (
                    <View>
                      <Text style={styles.subtitle}>PARCEIROS</Text>
                      <FlatList
                        horizontal
                        data={store.partners.filter(
                          (partner) => !partner.sponsorship
                        )}
                        keyExtractor={(item) => String(item.id)}
                        style={styles.patnerList}
                        renderItem={({ item }) => (
                          <BorderlessButton
                            style={styles.partnerItem}
                            onPress={() => {
                              navigation.navigate('partner', {
                                partner: item,
                              });
                            }}
                          >
                            {item.logo && (
                              <Image
                                source={{ uri: item.logo.url }}
                                style={styles.partnerLogo}
                              />
                            )}
                            <Text numberOfLines={2} style={styles.partnerName}>
                              {item.name}
                            </Text>
                          </BorderlessButton>
                        )}
                      />
                    </View>
                  )}
                  <CarouselComponent
                    featuredProducts={
                      store.products &&
                      store.products.filter((products) => products.featured)
                    }
                  />
                  <TextInput
                    label='Buscar'
                    left={
                      <TextInput.Icon
                        name={() => (
                          <Icon
                            name='search'
                            size={20}
                            color={colors.encarte}
                          />
                        )}
                        onPress={() => {}}
                      />
                    }
                    theme={{ colors: { primary: colors.encarte } }}
                    onChangeText={handleSearch}
                    returnKeyType='search'
                  />
                </>
              }
              renderItem={({ item }) =>
                productsFound !== null ? (
                  <ProductItem product={item} />
                ) : (
                  item.products.length > 0 && (
                    <FlatList
                      data={item.products}
                      keyExtractor={(product) => String(product.id)}
                      ListHeaderComponent={
                        <Text style={styles.categoryName}>{item.name}</Text>
                      }
                      renderItem={({ item: product }) => (
                        <ProductItem product={product} />
                      )}
                    />
                  )
                )
              }
              ListFooterComponent={
                <View style={styles.footer}>
                  {store.logo && (
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('info');
                      }}
                    >
                      <Image
                        source={{ uri: store.logo.url }}
                        style={styles.showcaseLogo}
                      />
                    </TouchableOpacity>
                  )}
                  <View style={styles.socialNetworks}>
                    {store.facebook && store.facebook.length > 0 ? (
                      <TouchableOpacity
                        onPress={() => {
                          Linking.canOpenURL(
                            `facebook://${store.facebook}`
                          ).then((supported) => {
                            if (supported) {
                              return Linking.openURL(
                                `facebook://${store.facebook}`
                              );
                            }

                            return Linking.openURL(
                              `https://facebook.com/${store.facebook}`
                            );
                          });
                        }}
                      >
                        <CommunityIcon
                          name='facebook'
                          size={40}
                          style={styles.facebook}
                        />
                      </TouchableOpacity>
                    ) : null}
                    {store.instagram && store.instagram.length > 0 ? (
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
                        <CommunityIcon
                          name='instagram'
                          size={40}
                          style={styles.instagram}
                        />
                      </TouchableOpacity>
                    ) : null}
                    {store.whatsapp && store.whatsapp.length > 0 ? (
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
                        <CommunityIcon
                          name='whatsapp'
                          size={40}
                          style={styles.whatsapp}
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  <Text style={styles.merelyIllustrativeImages}>
                    IMAGENS MERAMENTE ILUSTRATIVAS**
                  </Text>
                  <ShelfLife
                    align='center'
                    shelfLifeStart={store.shelfLifeStart}
                    shelfLifeEnd={store.shelfLifeEnd}
                  />
                  {store.address && store.city ? (
                    <>
                      <Text style={styles.info}>Endereço: {store.address}</Text>
                      <Text style={styles.info}>{store.city}.</Text>
                    </>
                  ) : null}
                  {store.phone ? (
                    <Text style={styles.info}>Contato: {store.phone}</Text>
                  ) : null}
                </View>
              }
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}

export default Store;
