/**
 * @fileoverview Profile stack navigator for user profile and account management.
 * Provides navigation structure for profile-related screens and account settings.
 * @author Stocchero
 * @version 1.0.0
 */

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Profile, EditProfile } from "../../screens/Profile";

const Stack = createNativeStackNavigator();

/**
 * Profile stack navigator component.
 * Currently manages the profile screen with potential for future expansion
 * to include edit profile, change password, settings, and account management screens.
 *
 * @component
 * @returns {React.JSX.Element} Rendered profile stack navigator
 *
 * @example
 * ```javascript
 * // Used in TabNavigator as the "Perfil" tab
 * import { ProfileStack } from './stack';
 *
 * <Tab.Screen
 *   name="Perfil"
 *   component={ProfileStack}
 *   options={{
 *     tabBarIcon: ({ focused }) => <ProfileTabIcon focused={focused} />
 *   }}
 * />
 *
 * // Future expansion potential:
 * // Profile → EditProfile → ChangePassword → Settings → AccountManagement
 * ```
 */
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{ headerTitle: "Mi Perfil" }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerTitle: "Editar Perfil",
          headerBackTitle: "Volver",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
