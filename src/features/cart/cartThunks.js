// src/features/cart/cartThunks.js
import { addItemToCart } from "./cartSlice";

export const safeAddItemToCart = (item) => (dispatch, getState) => {
  const state = getState();
  const existingItem = state.cart.items.find((i) => i.id === item.id);
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const totalAfterAdd = currentQuantity + (item.quantity || 1);

  if (totalAfterAdd > item.stock) {
    // Retornar falso para avisar
    return false;
  }

  dispatch(addItemToCart(item));
  return true;
};
