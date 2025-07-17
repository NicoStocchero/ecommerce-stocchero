/**
 * @fileoverview Cart stack navigator for shopping cart functionality.
 * Provides navigation structure for cart-related screens and checkout flow.
 * @author Stocchero
 * @version 1.0.0
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart } from "../../screens/Cart";

const Stack = createNativeStackNavigator();

/**
 * Cart stack navigator component.
 * Currently manages the shopping cart screen with potential for future expansion
 * to include checkout, payment, and order confirmation screens.
 *
 * @component
 * @returns {React.JSX.Element} Rendered cart stack navigator
 *
 * @example
 * ```javascript
 * // Used in TabNavigator as the "Carrito" tab
 * import { CartStack } from './stack';
 *
 * <Tab.Screen
 *   name="Carrito"
 *   component={CartStack}
 *   options={{
 *     tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />
 *   }}
 * />
 *
 * // Future expansion potential:
 * // Cart → Checkout → Payment → OrderConfirmation
 * ```
 */
const CartStack = () => {
  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerTitle: "Carrito" }}
      />
    </Stack.Navigator>
  );
};

export default CartStack;
