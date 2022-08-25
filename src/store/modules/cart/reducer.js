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
        const price = product.Products_Stores.customPrice || product.price;
        if (store) {
          const productExists = store.products.filter(
            (prod) => prod.id === product.id
          )[0];
          if (productExists) {
            productExists.amount += amount;
            const productExistsPrice =
              productExists.Products_Stores.customPrice || productExists.price;
            productExists.total = formatPrice(
              productExistsPrice * productExists.amount
            );
          } else {
            store.products.push({
              ...product,
              amount,
              total: formatPrice(price * amount),
            });
          }
        } else {
          draft.cart.push({
            storeId,
            products: [
              {
                ...product,
                amount,
                total: formatPrice(price * amount),
              },
            ],
          });
        }
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
            let minQuantity = productExists.fractionedQuantity ? 0.1 : 1;
            let updatedAmount;

            if (amount < minQuantity) {
              updatedAmount = minQuantity;
            } else if (amount > 500) {
              updatedAmount = 500;
            } else {
              updatedAmount = amount;
            }
            productExists.amount = updatedAmount;
            const price =
              productExists.Products_Stores.customPrice || productExists.price;
            productExists.total = formatPrice(price * updatedAmount);
          }
        }
      });
    case '@cart/CLEAR':
      return produce(state, (draft) => {
        const { storeId } = action.payload;
        const store = draft.cart.filter((crt) => crt.storeId === storeId)[0];
        store.products = [];
      });
    default:
      return state;
  }
}
