import React, { useEffect, useMemo, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { format, parseISO } from 'date-fns';

import { TextInput, useTheme } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import slugify from '~/util/slugify';
import { formatPrice } from '~/util/format';
import Loading from '~/components/Loading';
import { loadRequest } from '~/store/modules/showcase/actions';
import PriceTypeEnum from '~/util/PriceTypeEnum';
import styles from './styles';

function Store({ navigation, route }) {
  const dispatch = useDispatch();
  const { colors } = useTheme();
  const { showcase, loading } = useSelector((state) => state.showcase);
  const { storeURL } = route.params;

  const [productsFound, setProductsFound] = useState(null);

  useEffect(() => {
    dispatch(loadRequest(storeURL));
  }, []);

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
  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {store.logo && (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('info');
              }}
              style={styles.showcaseLogoButton}
            >
              <Image
                source={{ uri: store.logo.url }}
                style={styles.showcaseLogo}
              />
            </TouchableOpacity>
          )}
          {store.partners && (
            <View>
              <Text style={styles.subtitle}>PARCEIROS</Text>
              <FlatList
                horizontal
                data={store.partners.filter((partner) => !partner.sponsorship)}
                keyExtractor={(item) => String(item.id)}
                style={styles.patnerList}
                renderItem={({ item }) => (
                  <BorderlessButton
                    style={styles.partnerItem}
                    onPress={() => {
                      navigation.navigate('partner', { partner: item });
                    }}
                  >
                    <Image
                      source={{ uri: item.logo.url }}
                      style={styles.partnerLogo}
                    />
                    <Text numberOfLines={1} style={styles.partnerName}>
                      {item.name}
                    </Text>
                  </BorderlessButton>
                )}
              />
            </View>
          )}
          {store.products && (
            <View>
              <Text style={styles.subtitle}>PRODUTOS EM DESTAQUE</Text>
              <FlatList
                numColumns={3}
                data={store.products.filter((product) => product.featured)}
                keyExtractor={(item) => String(item.id)}
                style={styles.featuredProductsList}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.featuredProductItem}
                    onPress={() => {
                      navigation.navigate('partner', { partner: item });
                    }}
                  >
                    <Image
                      source={{ uri: item.image.url }}
                      style={styles.featuredProductImage}
                    />
                  </TouchableOpacity>
                )}
              />
            </View>
          )}
          <TextInput
            label='Buscar'
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
          />
          <FlatList
            data={productsFound !== null ? productsFound : store.categories}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) =>
              productsFound !== null ? (
                <TouchableOpacity onPress={() => {}} style={styles.productCard}>
                  <Image
                    source={{ uri: item.image.url }}
                    style={styles.productImage}
                  />
                  <View style={styles.productContent}>
                    <Text>{item.name}</Text>
                    <ProductItemPrice product={item} />
                  </View>
                </TouchableOpacity>
              ) : (
                item.products.length > 0 && (
                  <>
                    <Text style={styles.categoryName}>{item.name}</Text>
                    <FlatList
                      data={item.products}
                      keyExtractor={(product) => String(product.id)}
                      renderItem={({ item: product }) => (
                        <TouchableOpacity
                          onPress={() => {}}
                          style={styles.productCard}
                        >
                          <Image
                            source={{ uri: product.image.url }}
                            style={styles.productImage}
                          />
                          <View style={styles.productContent}>
                            <Text>{product.name}</Text>
                            <ProductItemPrice product={product} />
                          </View>
                        </TouchableOpacity>
                      )}
                    />
                  </>
                )
              )
            }
          />
        </>
      )}
    </ScrollView>
  );
}

export default Store;
