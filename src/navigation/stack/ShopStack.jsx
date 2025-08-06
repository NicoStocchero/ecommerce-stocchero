/**
 * @fileoverview Shop stack navigator for categories, products, and product detail screens.
 * Manages the shopping flow navigation from categories to individual product details.
 * @author Stocchero
 * @version 1.0.0
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Categories, Products, ProductDetail } from "../../screens/Shop";
import { StoreLocator } from "../../screens/Location";

const Stack = createNativeStackNavigator();

/**
 * Shop stack navigator component.
 * Provides navigation flow through the shopping experience: Categories → Products → ProductDetail.
 * Each screen has appropriate headers with Spanish titles for user clarity.
 *
 * @component
 * @returns {React.JSX.Element} Rendered shop stack navigator
 *
 * @example
 * ```javascript
 * // Used in TabNavigator as the "Tienda" tab
 * import { ShopStack } from './stack';
 *
 * <Tab.Screen
 *   name="Tienda"
 *   component={ShopStack}
 *   options={{
 *     tabBarIcon: ({ focused }) => <ShopTabIcon focused={focused} />
 *   }}
 * />
 *
 * // Navigation flow:
 * // Categories → Products (with categoryId param) → ProductDetail (with productId param)
 * // StoreLocator (for store locations)
 * ```
 */
const ShopStack = () => {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen
        name="Categories"
        component={Categories}
        options={{ headerTitle: "Categorías" }}
      />
      <Stack.Screen
        name="Products"
        component={Products}
        options={{ headerTitle: "Productos" }}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerTitle: "" }}
      />
      <Stack.Screen
        name="StoreLocator"
        component={StoreLocator}
        options={{ headerTitle: "Ubicación de Tiendas" }}
      />
    </Stack.Navigator>
  );
};

export default ShopStack;
