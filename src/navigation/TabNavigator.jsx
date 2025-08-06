/**
 * @fileoverview Main tab navigation component for authenticated users.
 * Provides bottom tab navigation between Shop, Cart, and Orders sections.
 * @author Stocchero
 * @version 1.0.0
 */

/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { ShopStack, CartStack, OrderStack, ProfileStack } from "./stack";
import colors from "../global/colors";

/**
 * Tab icon component props
 * @typedef {Object} TabIconProps
 * @property {string} name - Ionicons icon name
 * @property {string} color - Icon color
 * @property {number} size - Icon size
 */

/**
 * Individual tab icon props
 * @typedef {Object} IndividualTabIconProps
 * @property {boolean} focused - Whether the tab is currently focused
 * @property {number} iconSize - Size of the icon
 */

/**
 * Generic tab bar icon component.
 *
 * @component
 * @param {TabIconProps} props - Component props
 * @returns {React.JSX.Element} Rendered Ionicons icon
 */
const TabBarIcon = ({ name, color, size }) => (
  <Ionicons name={name} color={color} size={size} />
);

/**
 * Shop tab icon with focus-based styling.
 *
 * @component
 * @param {IndividualTabIconProps} props - Component props
 * @returns {React.JSX.Element} Rendered shop tab icon
 */
const ShopTabIcon = ({ focused, iconSize }) => (
  <TabBarIcon
    name={focused ? "storefront" : "storefront-outline"}
    color={focused ? colors.primary : colors.gray}
    size={iconSize}
  />
);

/**
 * Cart tab icon with focus-based styling.
 *
 * @component
 * @param {IndividualTabIconProps} props - Component props
 * @returns {React.JSX.Element} Rendered cart tab icon
 */
const CartTabIcon = ({ focused, iconSize }) => (
  <TabBarIcon
    name={focused ? "cart" : "cart-outline"}
    color={focused ? colors.primary : colors.gray}
    size={iconSize}
  />
);

/**
 * Orders tab icon with focus-based styling.
 *
 * @component
 * @param {IndividualTabIconProps} props - Component props
 * @returns {React.JSX.Element} Rendered orders tab icon
 */
const OrderTabIcon = ({ focused, iconSize }) => (
  <TabBarIcon
    name={focused ? "receipt" : "receipt-outline"}
    color={focused ? colors.primary : colors.gray}
    size={iconSize}
  />
);

/**
 * Profile tab icon with focus-based styling.
 *
 * @component
 * @param {IndividualTabIconProps} props - Component props
 * @returns {React.JSX.Element} Rendered profile tab icon
 */
const ProfileTabIcon = ({ focused, iconSize }) => (
  <TabBarIcon
    name={focused ? "person" : "person-outline"}
    color={focused ? colors.primary : colors.gray}
    size={iconSize}
  />
);

const Tab = createBottomTabNavigator();

/**
 * Main tab navigator component for authenticated users.
 * Provides responsive bottom tab navigation between Shop, Cart, and Orders.
 * Automatically adjusts icon sizes and spacing based on screen dimensions.
 *
 * @component
 * @returns {React.JSX.Element} Rendered bottom tab navigator
 *
 * @example
 * ```javascript
 * // Used in RootNavigator for authenticated users
 * import TabNavigator from './TabNavigator';
 *
 * const RootNavigator = () => {
 *   const { isAuthenticated } = useSelector(state => state.auth);
 *   return isAuthenticated ? <TabNavigator /> : <AuthStack />;
 * };
 * ```
 */
const TabNavigator = () => {
  const { width } = useWindowDimensions();

  // Responsive sizing calculations
  const iconSize = Math.max(20, Math.min(width * 0.06, 32));
  const labelFontSize = Math.max(10, Math.min(width * 0.035, 14));
  const tabPaddingVertical = width < 380 ? 4 : 8;
  const tabBarHeight = width < 380 ? 60 : 70;

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray,
        tabBarLabelStyle: {
          fontSize: labelFontSize,
          fontFamily: "Inter_18pt-Medium",
        },
        tabBarItemStyle: {
          paddingVertical: tabPaddingVertical,
        },
        tabBarStyle: {
          height: tabBarHeight,
          backgroundColor: colors.white,
          borderTopWidth: 1,
          borderTopColor: colors.lightGray,
          elevation: 8,
          shadowColor: colors.black,
          shadowOffset: {
            width: 0,
            height: -2,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
      }}
    >
      <Tab.Screen
        name="Tienda"
        component={ShopStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <ShopTabIcon focused={focused} iconSize={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Carrito"
        component={CartStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <CartTabIcon focused={focused} iconSize={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Pedidos"
        component={OrderStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <OrderTabIcon focused={focused} iconSize={iconSize} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileTabIcon focused={focused} iconSize={iconSize} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
