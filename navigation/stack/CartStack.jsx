// navigation/CartStack.jsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Cart } from '../../src/screens/Cart';

const Stack = createNativeStackNavigator();

export default function CartStack() {
  return (
    <Stack.Navigator initialRouteName="Cart">
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerTitle: 'Carrito' }}
      />
    </Stack.Navigator>
  );
}
