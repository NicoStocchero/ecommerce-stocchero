/* eslint-disable react/no-unstable-nested-components */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useWindowDimensions } from "react-native";
import { ShopStack, CartStack, OrderStack } from "./stack";
import colors from "../global/colors";

// Mover componentes fuera del render para evitar recreación
const TabBarIcon = ({ name, color, size }) => (
  <Ionicons name={name} color={color} size={size} />
);

const ShopTabIcon = ({ focused, iconSize }) => (
  <TabBarIcon
    name={focused ? "storefront" : "storefront-outline"}
    color={focused ? colors.primary : colors.gray}
    size={iconSize}
  />
);

const CartTabIcon = ({ focused, iconSize }) => (
  <TabBarIcon
    name={focused ? "cart" : "cart-outline"}
    color={focused ? colors.primary : colors.gray}
    size={iconSize}
  />
);

const OrderTabIcon = ({ focused, iconSize }) => (
  <TabBarIcon
    name={focused ? "receipt" : "receipt-outline"}
    color={focused ? colors.primary : colors.gray}
    size={iconSize}
  />
);

const Tab = createBottomTabNavigator();

// Cambiar function declaration a arrow function
const TabNavigator = () => {
  const { width } = useWindowDimensions();

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
    </Tab.Navigator>
  );
};

export default TabNavigator;
