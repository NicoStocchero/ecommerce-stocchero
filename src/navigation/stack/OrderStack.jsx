/**
 * @fileoverview Orders stack navigator for order history and management.
 * Provides navigation structure for order-related screens and order details.
 * @author Stocchero
 * @version 1.0.0
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Orders } from "../../screens/Orders";

const Stack = createNativeStackNavigator();

/**
 * Orders stack navigator component.
 * Currently manages the orders history screen with potential for future expansion
 * to include order details, order tracking, and order management screens.
 *
 * @component
 * @returns {React.JSX.Element} Rendered orders stack navigator
 *
 * @example
 * ```javascript
 * // Used in TabNavigator as the "Pedidos" tab
 * import { OrderStack } from './stack';
 *
 * <Tab.Screen
 *   name="Pedidos"
 *   component={OrderStack}
 *   options={{
 *     tabBarIcon: ({ focused }) => <OrderTabIcon focused={focused} />
 *   }}
 * />
 *
 * // Future expansion potential:
 * // Orders → OrderDetail → OrderTracking → OrderSupport
 * ```
 */
const OrderStack = () => {
  return (
    <Stack.Navigator initialRouteName="Orders">
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerTitle: "Pedidos" }}
      />
    </Stack.Navigator>
  );
};

export default OrderStack;
