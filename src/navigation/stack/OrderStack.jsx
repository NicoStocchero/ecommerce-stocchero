// navigation/OrderStack.jsx
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Orders } from "../../screens/Orders";

const Stack = createNativeStackNavigator();

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
