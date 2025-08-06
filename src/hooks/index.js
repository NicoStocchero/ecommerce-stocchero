/**
 * @fileoverview Hooks module exports.
 * Provides custom hooks for common functionality across the application.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module Hooks
 * @description Collection of custom hooks for the application
 *
 * @example
 * ```javascript
 * import { useProfileImage, useSession, useImagePermissions, useProductFiltering, useLocation } from '../hooks';
 *
 * // Use hooks in components
 * const { selectImage, isUpdating } = useProfileImage();
 * const { handleLogout } = useSession();
 * const { keyword, setKeyword, filteredProducts } = useProductFiltering(products);
 * const { location, getCurrentLocation } = useLocation();
 * ```
 */

export { useImagePermissions } from "./useImagePermissions";
export { useLocation } from "./useLocation";
export { useMapControl } from "./useMapControl";
export { useProductFiltering } from "./useProductFiltering";
export { useProfileImage } from "./useProfileImage";
export { useProfileNavigation } from "./useProfileNavigation";
export { useSession } from "./useSession";
export { useSQLite } from "./useSQLite";
export { useStoresData } from "./useStoresData";
export { useAuthToken } from "./useAuthToken";
