// navigation/CartStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Cart } from "../../screens/Cart";

const Stack = createNativeStackNavigator();

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
