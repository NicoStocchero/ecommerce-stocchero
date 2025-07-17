/**
 * @fileoverview Navigation stack exports module.
 * Centralizes exports for all navigation stack components used throughout the app.
 * @author Stocchero
 * @version 1.0.0
 */

/**
 * @module NavigationStacks
 * @description Collection of navigation stack components for different app sections
 *
 * @example
 * ```javascript
 * import { ShopStack, CartStack, OrderStack, AuthStack } from './navigation/stack';
 *
 * // Use in tab navigator
 * <Tab.Screen name="Tienda" component={ShopStack} />
 * <Tab.Screen name="Carrito" component={CartStack} />
 * <Tab.Screen name="Pedidos" component={OrderStack} />
 *
 * // Use in root navigator
 * {isAuthenticated ? <TabNavigator /> : <AuthStack />}
 * ```
 */

export { default as ShopStack } from "./ShopStack";
export { default as CartStack } from "./CartStack";
export { default as OrderStack } from "./OrderStack";
export { default as AuthStack } from "./AuthStack";
