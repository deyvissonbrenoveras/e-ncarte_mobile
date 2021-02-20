import produce from 'immer';
import { formatPrice } from '../../../util/format';

const INITIAL_STATE = {
  cart: [],
};
export default function cart(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@cart/ADD_PRODUCT':
      return produce(state, (draft) => {
        const { storeId, product, amount } = action.payload;
        const store = draft.cart.filter((crt) => crt.storeId === storeId)[0];
        if (store) {
          const productExists = store.products.filter(
            (prod) => prod.id === product.id
          )[0];
          if (productExists) {
            productExists.amount += amount;
            productExists.total = formatPrice(
              productExists.price * productExists.amount
            );
          } else {
            store.products.push({
              ...product,
              amount,
              total: formatPrice(product.price * amount),
            });
          }
        } else {
          draft.cart.push({
            storeId,
            products: [
              {
                ...product,
                amount,
                total: formatPrice(product.price * amount),
              },
            ],
          });
        }
        // const store = draft.cart.filter(
        //   (str) => str.storeId === action.payload.storeId
        // )[0];
        // const productIndex = store.products.findIndex(
        //   (p) => p.id === action.payload.product.id
        // );
        // if (productIndex >= 0) {
        //   store.products[productIndex].amount += action.payload.amount;
        //   store.products[productIndex].total = formatPrice(
        //     store.products[productIndex].price *
        //       store.products[productIndex].amount
        //   );
        // } else {
        //   store.products.push({
        //     ...action.payload.product,
        //     amount: action.payload.amount,
        //     total: formatPrice(
        //       action.payload.product.price * action.payload.amount
        //     ),
        //   });
        // }
      });
    case '@cart/REMOVE_PRODUCT':
      return produce(state, (draft) => {
        const { storeId, productId } = action.payload;
        const store = draft.cart.filter((crt) => crt.storeId === storeId)[0];
        store.products = store.products.filter(
          (product) => product.id !== productId
        );
      });
    case '@cart/CHANGE_AMOUNT':
      return produce(state, (draft) => {
        const { storeId, productId, amount } = action.payload;
        const store = draft.cart.filter((crt) => crt.storeId === storeId)[0];
        if (store) {
          const productExists = store.products.filter(
            (prod) => prod.id === productId
          )[0];
          if (productExists) {
            if (amount >= 1 && amount <= 500) {
              productExists.amount = amount;
              productExists.total = formatPrice(productExists.price * amount);
            }
          }
        }
        // const product = draft.products.filter(
        //   (prod) => prod.id === action.payload.id
        // )[0];
        // if (product) {
        //   const { amount } = action.payload;
        //   if (amount >= 1 && amount <= 500) {
        //     product.amount = amount;
        //     product.total = formatPrice(product.price * amount);
        //   }
        // }
      });
    default:
      return state;
  }
}
