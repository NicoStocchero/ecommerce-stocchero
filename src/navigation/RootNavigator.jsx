/**
 * @fileoverview Root navigation component that handles authentication-based routing.
 * Conditionally renders authenticated or unauthenticated navigation stacks.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { AuthStack } from "./stack";

/**
 * Root navigation component that manages app-wide navigation based on authentication state.
 * Renders either the main app navigation (TabNavigator) for authenticated users
 * or the authentication flow (AuthStack) for unauthenticated users.
 *
 * @component
 * @returns {React.JSX.Element} Rendered navigation container with appropriate navigator
 *
 * @example
 * ```javascript
 * // Used in App.jsx as the main navigation component
 * import RootNavigator from './navigation/RootNavigator';
 *
 * export default function App() {
 *   return <RootNavigator />;
 * }
 * ```
 */
const RootNavigator = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {isAuthenticated ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default RootNavigator;
