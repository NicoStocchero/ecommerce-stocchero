/**
 * @fileoverview Redux store configuration using Redux Toolkit.
 * Combines reducers from cart, shop, auth slices and RTK Query APIs.
 * @author Stocchero
 * @version 1.0.0
 */

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import shopReducer from "../features/shop/shopSlice";
import authReducer from "../features/auth/authSlice";
import { authApi } from "../services/auth/authApi";
import { shopApi } from "../services/shop/shopApi";

/**
 * Redux store configuration with all reducers and middleware.
 * Combines state slices for cart, shop, and authentication with RTK Query APIs.
 * Includes middleware for API caching and development tools integration.
 *
 * @example
 * ```javascript
 * import { store } from './store/store';
 * import { Provider } from 'react-redux';
 *
 * // Wrap your app with the store provider
 * <Provider store={store}>
 *   <App />
 * </Provider>
 * ```
 */
export const store = configureStore({
  reducer: {
    // State slices
    cart: cartReducer,
    shop: shopReducer,
    auth: authReducer,
    // RTK Query API slices
    [shopApi.reducerPath]: shopApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, shopApi.middleware),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
