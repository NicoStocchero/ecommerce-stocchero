/**
 * @fileoverview Redux store configuration using Redux Toolkit.
 * Combines reducers from cart, shop, user slices and RTK Query APIs.
 * Uses unified user state management to eliminate fragmentation.
 * @author Stocchero
 * @version 1.0.0
 */

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import shopReducer from "../features/shop/shopSlice";
import userReducer from "../features/user/userSlice";
import { authApi } from "../services/auth/authApi";
import { shopApi } from "../services/shop/shopApi";
import { profileApi } from "../services/profile/profileApi";
import { ordersApi } from "../services/orders/ordersApi";

/**
 * Redux store configuration with all reducers and middleware.
 * Combines state slices for cart, shop, and unified user management with RTK Query APIs.
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
    user: userReducer, // Unified user state (auth + profile)

    // RTK Query API slices
    [authApi.reducerPath]: authApi.reducer,
    [shopApi.reducerPath]: shopApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      shopApi.middleware,
      profileApi.middleware,
      ordersApi.middleware
    ),
  // Enable Redux DevTools in development
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
