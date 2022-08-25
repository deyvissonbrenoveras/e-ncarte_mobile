import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PriceTypeEnum from '~/util/PriceTypeEnum';
import { formatPrice } from '~/util/format';
import styles from './styles';
import { addProduct } from '~/store/modules/cart/actions';
import {
  getQuantityToAdd,
  getQuantityToRemove,
} from '../../../helpers/productQuantityCalculationHelper';

function Product({ route, navigation }) {
  const dispatch = useDispatch();
  const { product, storeId } = route.params;

  const [amount, setAmount] = useState(1);
  const [total, setTotal] = useState(null);

  function handleAddProduct() {
    dispatch(addProduct(storeId, product, amount));
    navigation.navigate('cart');
  }

  function decreaseAmount() {
    const minimumValue = product.fractionedQuantity ? 0.1 : 1;
    if (amount > minimumValue) {
      const newAmount = getQuantityToRemove(product.fractionedQuantity, amount);
      setAmount(newAmount);
    }
  }

  function increaseAmount() {
    const newAmount = getQuantityToAdd(product.fractionedQuantity, amount);
    setAmount(newAmount);
  }
  useEffect(() => {
    if (product) {
      const price = product.Products_Stores.customPrice || product.price;
      setTotal(formatPrice(amount * price));
    }
  }, [amount, product]);
  function ProductItemPrice(params) {
    const { product: prod } = params;

    switch (prod.priceType) {
      case PriceTypeEnum.DEFAULT:
        return (
          <Text style={styles.productDefaultPrice}>{prod.formattedPrice}</Text>
        );
      case PriceTypeEnum.SPECIAL_OFFER:
        return (
          <Text style={styles.specialOfferProductPrice}>OFERTA ESPECIAL</Text>
        );
      case PriceTypeEnum.FEATURED:
        return <Text style={styles.featuredPrice}>{prod.formattedPrice}</Text>;
      default:
        return <Text style={styles.productPrice}>{prod.formattedPrice}</Text>;
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          style={styles.productImage}
          source={{ uri: product.image.url }}
        />
        <View style={styles.productContent}>
          <View style={styles.productName}>
            <Text style={styles.productNameText}>{product.name}</Text>
          </View>
          <View style={styles.productPrice}>
            <Text style={styles.productPriceText}>Preço:</Text>
            <ProductItemPrice product={product} />
          </View>
          <Text style={styles.productDescriptionTitle}>Descrição</Text>
          <View style={styles.productDescription}>
            <Text style={styles.productDescriptionText}>
              {product.description}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.addProduct}>
        <View style={styles.amountContainer}>
          <TouchableOpacity onPress={decreaseAmount}>
            <Icon style={styles.iconColor} name='remove' size={25} />
          </TouchableOpacity>
          <Text style={styles.amountInput}>{amount}</Text>
          <TouchableOpacity onPress={increaseAmount}>
            <Icon style={styles.iconColor} name='add' size={25} />
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>
          {product.priceType !== PriceTypeEnum.SPECIAL_OFFER &&
            (total || product.formattedPrice)}
        </Text>
        <TouchableOpacity onPress={handleAddProduct}>
          <Icon style={styles.iconColor} name='add-shopping-cart' size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Product;
