// navigation/ShopNavigator.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Categories, Products, ProductDetail } from "../../screens/Shop";

const Stack = createNativeStackNavigator();

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
    </Stack.Navigator>
  );
};

export default ShopStack;
