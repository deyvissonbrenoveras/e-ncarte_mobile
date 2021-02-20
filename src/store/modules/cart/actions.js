export function addProduct(storeId, product, amount) {
  return {
    type: '@cart/ADD_PRODUCT',
    payload: { storeId, product, amount },
  };
}

export function removeProduct(storeId, productId) {
  return {
    type: '@cart/REMOVE_PRODUCT',
    payload: { storeId, productId },
  };
}

export function changeAmount(storeId, productId, amount) {
  return {
    type: '@cart/CHANGE_AMOUNT',
    payload: { storeId, productId, amount },
  };
}
