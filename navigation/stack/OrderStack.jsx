// navigation/OrderStack.jsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Orders } from '../../src/screens/Orders';

const Stack = createNativeStackNavigator();

export default function OrderStack() {
  return (
    <Stack.Navigator initialRouteName="Orders">
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{ headerTitle: 'Pedidos' }}
      />
    </Stack.Navigator>
  );
}
