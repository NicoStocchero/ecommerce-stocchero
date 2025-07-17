/**
 * @fileoverview Authentication stack navigator for login and signup screens.
 * Provides navigation between Login and SignUp screens for unauthenticated users.
 * @author Stocchero
 * @version 1.0.0
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../../screens/Auth/Login";
import SignUp from "../../screens/Auth/SignUp";

const Stack = createNativeStackNavigator();

/**
 * Authentication stack navigator component.
 * Manages navigation between Login and SignUp screens for unauthenticated users.
 * Configured with hidden headers for custom UI design.
 *
 * @component
 * @returns {React.JSX.Element} Rendered authentication stack navigator
 *
 * @example
 * ```javascript
 * // Used in RootNavigator for unauthenticated users
 * import { AuthStack } from './stack';
 *
 * const RootNavigator = () => {
 *   const { isAuthenticated } = useSelector(state => state.auth);
 *   return (
 *     <NavigationContainer>
 *       {isAuthenticated ? <TabNavigator /> : <AuthStack />}
 *     </NavigationContainer>
 *   );
 * };
 * ```
 */
const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="SignUp" component={SignUp} />
  </Stack.Navigator>
);

export default AuthStack;
