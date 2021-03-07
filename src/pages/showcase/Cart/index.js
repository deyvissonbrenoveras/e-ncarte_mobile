import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, FlatList, Image, Linking } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import CommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { removeProduct, changeAmount } from '~/store/modules/cart/actions';
import { formatPrice } from '~/util/format';
import PriceTypeEnum from '~/util/PriceTypeEnum';
import styles from './styles';

function Cart() {
  const dispatch = useDispatch();
  const store = useSelector((state) => state.showcase.showcase);
  const cart = useSelector((state) =>
    state.cart.cart.filter((crt) => crt.storeId === store.id)[0]
      ? state.cart.cart.filter((crt) => crt.storeId === store.id)[0].products
      : []
  );

  const [total, setTotal] = useState(formatPrice(0));
  useEffect(() => {
    const newTotal = cart.reduce(
      (accumulator, currentProduct) =>
        accumulator + currentProduct.price * currentProduct.amount,
      0
    );
    setTotal(formatPrice(newTotal));
  }, [cart]);
  async function handleSend() {
    let buyList = await cart.reduce((list, product, index) => {
      let text = `${list} %0A%0A ${index + 1}: Id ${product.id} `;
      text += `%0AProduto: ${product.name}`;
      text += `%0APreço: ${
        product.priceType === PriceTypeEnum.SPECIAL_OFFER
          ? 'OFERTA ESPECIAL'
          : product.formattedPrice
      }`;
      text += `%0AQuantidade: ${product.amount}`;
      if (product.priceType !== PriceTypeEnum.SPECIAL_OFFER) {
        text += `%0ASubtotal: ${product.total}`;
      }
      return text;
    }, 'Lista de compras e-ncarte:');
    buyList += `%0A%0ATotal: ${total}`;

    Linking.canOpenURL(
      `whatsapp://send?phone=${store.whatsapp}&text=${buyList}`
    ).then((supported) => {
      if (supported) {
        return Linking.openURL(
          `whatsapp://send?phone=${store.whatsapp}&text=${buyList}`
        );
      }
      return Linking.openURL(
        `https://api.whatsapp.com/send?phone=${store.whatsapp}&text=${buyList}`
      );
    });
  }
  function handleRemove(productId) {
    dispatch(removeProduct(store.id, productId));
  }
  function handleRemoveAmount(productId, amount) {
    dispatch(changeAmount(store.id, productId, amount));
  }
  function handleAddAmount(productId, amount) {
    dispatch(changeAmount(store.id, productId, amount));
  }
  function ProductItemPrice(params) {
    const { product: prod } = params;

    switch (prod.priceType) {
      case PriceTypeEnum.DEFAULT:
        return <Text style={styles.productPrice}>{prod.formattedPrice}</Text>;
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
      {cart && cart.length === 0 ? (
        <View style={styles.emptyCart}>
          <CommunityIcon style={styles.emptyCartColor} name='cart' size={100} />
          <Text style={styles.emptyCartColor}>Carrinho vazio</Text>
        </View>
      ) : (
        <>
          {cart && (
            <FlatList
              data={cart}
              keyExtractor={(product) => String(product.id)}
              renderItem={({ item: product }) => (
                <View onPress={() => {}} style={styles.productCard}>
                  <Image
                    source={{ uri: product.image.url }}
                    style={styles.productImage}
                  />
                  <View style={styles.productContent}>
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <ProductItemPrice product={product} />
                      <View style={styles.amountArea}>
                        <TouchableOpacity
                          onPress={() => {
                            handleRemoveAmount(
                              product.id,
                              String(Number(product.amount) - 1)
                            );
                          }}
                        >
                          <Icon
                            style={styles.iconColor}
                            name='remove'
                            size={15}
                          />
                        </TouchableOpacity>
                        <Text style={styles.productAmount}>
                          {product.amount}
                        </Text>
                        <TouchableOpacity
                          onPress={() => {
                            handleAddAmount(
                              product.id,
                              String(Number(product.amount) + 1)
                            );
                          }}
                        >
                          <Icon style={styles.iconColor} name='add' size={15} />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.subTotal}>
                    {product.priceType !== PriceTypeEnum.SPECIAL_OFFER && (
                      <>
                        <Text style={styles.subTotalText}>Subtotal:</Text>
                        <Text style={styles.subTotalPrice}>
                          {product.total}
                        </Text>
                      </>
                    )}

                    <TouchableOpacity
                      onPress={() => {
                        handleRemove(product.id);
                      }}
                    >
                      <Icon style={styles.iconColor} name='delete' size={15} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
          )}
          <View style={styles.total}>
            <Text style={styles.totalText}>Valor Total: {total}</Text>
            {store.whatsapp && (
              <TouchableOpacity style={styles.totalButton} onPress={handleSend}>
                <Text style={styles.totalButtonText}> Enviar pedido</Text>
                <CommunityIcon
                  style={styles.totalButtonWhatsappIcon}
                  name='whatsapp'
                  size={25}
                />
              </TouchableOpacity>
            )}
          </View>
        </>
      )}
    </View>
  );
}

export default Cart;
