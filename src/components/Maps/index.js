/**
 * @fileoverview Maps components module exports.
 * Provides reusable components for maps and location functionality.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module MapsComponents
 * @description Collection of reusable maps UI components
 *
 * @example
 * ```javascript
 * import { GoogleMap, MapControls, StoresList } from '../components/Maps';
 *
 * // Use in screens
 * <GoogleMap markers={stores} showsUserLocation={true} />
 * <MapControls onMyLocation={handleMyLocation} onFitAllStores={handleFitAll} />
 * <StoresList stores={stores} onStoreSelect={handleStoreSelect} />
 * ```
 */

export { default as GoogleMap } from "./GoogleMap";
export { default as MapControls } from "./MapControls";
export { default as StoresList } from "./StoresList";
