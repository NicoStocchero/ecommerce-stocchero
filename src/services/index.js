/**
 * @fileoverview Services module exports.
 * Provides centralized access to all API services for clean imports.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module Services
 * @description Collection of all API services for the application
 *
 * @example
 * ```javascript
 * // Import specific APIs
 * import { authApi, profileApi, shopApi } from '../services';
 *
 * // Import specific hooks
 * import { useLoginMutation, useUploadProfileImageMutation } from '../services';
 * ```
 */

// Export APIs that actually work
export { authApi } from "./auth/authApi";
export { profileApi } from "./profile/profileApi";
export { shopApi } from "./shop/shopApi";
export { ordersApi } from "./orders/ordersApi";

// Export auth hooks
export { useSignUpMutation, useLoginMutation } from "./auth/authApi";

// Export profile hooks
export {
  useUploadProfileImageMutation,
  useUpdateProfileDataMutation,
  useGetProfileDataQuery,
} from "./profile/profileApi";

// Export shop hooks
export {
  useGetCategoriesQuery,
  useGetProductsByCategoryQuery,
  useGetProductByIdQuery,
} from "./shop/shopApi";

// Export orders hooks
export { useCreateOrderMutation, useGetOrdersQuery } from "./orders/ordersApi";
