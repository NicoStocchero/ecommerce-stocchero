import { configureStore } from "@reduxjs/toolkit";
import shopReducer from "../features/shop/shopSlice";
import cartReducer from "../features/cart/cartSlice";
import { shopApi } from "../services/shop/shopApi";

const store = configureStore({
  reducer: {
    shop: shopReducer,
    cart: cartReducer,
    [shopApi.reducerPath]: shopApi.reducer,
  },
  // Enable Redux DevTools
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});

export default store;
