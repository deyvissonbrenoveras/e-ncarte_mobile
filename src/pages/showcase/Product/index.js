import React, { useState, useEffect } from 'react';
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

function Product({ route }) {
  const { product } = route.params;

  const [amount, setAmount] = useState('1');
  const [total, setTotal] = useState(null);

  function decreaseAmount() {
    if (amount > 1) {
      setAmount(String(Number(amount) - 1));
    }
  }

  function increaseAmount() {
    setAmount(String(Number(amount) + 1));
  }
  function handleAmountChange(value) {
    const valueNumber = Number(value);
    if (valueNumber >= 0 && valueNumber <= 500) {
      setAmount(String(valueNumber));
    }
  }
  async function amountFocusOut(event) {
    const valueNumber = Number(event.nativeEvent.text);
    if (valueNumber < 1 || valueNumber > 500) {
      await setAmount('1');
    }
  }
  useEffect(() => {
    if (product) {
      setTotal(formatPrice(amount * product.price));
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
          <TextInput
            style={styles.amountInput}
            keyboardType='number-pad'
            value={amount}
            onChangeText={handleAmountChange}
            onEndEditing={amountFocusOut}
          />
          <TouchableOpacity onPress={increaseAmount}>
            <Icon style={styles.iconColor} name='add' size={25} />
          </TouchableOpacity>
        </View>
        <Text style={styles.total}>{total}</Text>
        <TouchableOpacity>
          <Icon style={styles.iconColor} name='add-shopping-cart' size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Product;
