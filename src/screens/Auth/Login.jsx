/**
 * @fileoverview Login screen component for user authentication.
 * Handles user login with email/password, form validation, and navigation to signup.
 * @author Stocchero
 * @version 1.0.0
 */

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  Text,
  Alert,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../global/colors";
import { useLoginMutation } from "../../services/auth/authApi";
import {
  authSuccess,
  authFailure,
  clearError,
} from "../../features/auth/authSlice";
import { FormInput, ErrorMessage, AuthButton } from "../../components/Auth";
import { loginSchema } from "../../schemas/authSchema";
import {
  mapZodErrors,
  validateField,
  emptyErrors,
} from "../../utils/validationHelpers";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrorMessage";

/**
 * Login screen component props
 * @typedef {Object} LoginProps
 * @property {Object} navigation - React Navigation object for screen navigation
 * @property {function} navigation.navigate - Function to navigate to other screens
 */

/**
 * Login screen component for user authentication.
 * Provides a complete login form with email/password fields, validation, error handling,
 * and navigation to signup. Includes forgot password functionality and auto-focus management.
 *
 * Features:
 * - Real-time form validation with Zod schema
 * - Password visibility toggle
 * - Keyboard navigation between fields
 * - Firebase authentication integration
 * - Error handling and user feedback
 * - Responsive design with keyboard avoidance
 *
 * @component
 * @param {LoginProps} props - Component props
 * @returns {React.JSX.Element} Rendered login screen
 *
 * @example
 * ```javascript
 * // Used in AuthStack navigator
 * <Stack.Screen name="Login" component={Login} />
 *
 * // Navigation from SignUp screen
 * navigation.navigate("Login");
 * ```
 */
const Login = ({ navigation }) => {
  // Form state management
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState(emptyErrors(formData));
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Refs for keyboard navigation
  const passwordRef = useRef(null);

  // Redux hooks
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();

  /**
   * Effect to clear form when user is authenticated
   */
  useEffect(() => {
    if (isAuthenticated) setFormData({ email: "", password: "" });
  }, [isAuthenticated]);

  /**
   * Updates form data and clears field errors when user types
   * @param {string} field - Form field name to update
   * @param {string} value - New field value
   */
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] && touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  /**
   * Handles field blur event and validates individual field
   * @param {string} field - Form field name that lost focus
   */
  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(loginSchema, formData, field);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  /**
   * Validates entire form using Zod schema
   * @param {Object} data - Form data to validate
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = (data) => {
    const result = loginSchema.safeParse(data);
    if (!result.success) {
      setErrors(mapZodErrors(result));
      setTouched({ email: true, password: true });
      return false;
    }
    setErrors(emptyErrors(data));
    return true;
  };

  /**
   * Handles login form submission
   * Validates form, calls login API, and dispatches appropriate actions
   */
  const handleLogin = async () => {
    Keyboard.dismiss();
    if (!validateForm(formData)) return;

    dispatch(clearError());
    const result = await login({
      email: formData.email,
      password: formData.password,
      returnSecureToken: true,
    });

    if (result.data) {
      dispatch(
        authSuccess({
          user: {
            email: result.data.email,
            localId: result.data.localId,
          },
          token: result.data.idToken,
          refreshToken: result.data.refreshToken,
        })
      );
    } else if (result.error) {
      const errorMessage = getFirebaseErrorMessage(result.error, "login");
      dispatch(authFailure(errorMessage));
      Alert.alert("Error", errorMessage);
    }
  };

  /**
   * Handles forgot password functionality
   * Currently shows placeholder alert, to be implemented with Firebase auth
   */
  const handleForgotPassword = () => {
    if (!formData.email) {
      Alert.alert(
        "Email requerido",
        "Por favor ingresa tu email para recuperar la contraseña"
      );
      return;
    }
    Alert.alert(
      "Función pendiente",
      "La recuperación de contraseña se implementará próximamente"
    );
  };

  /**
   * Navigates to SignUp screen
   */
  const handleRegister = () => navigation.navigate("SignUp");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.microcopy}>
              ¡Bienvenido de nuevo a Tienda Renace!
            </Text>
          </View>

          <ErrorMessage message={error} />

          <View style={styles.form}>
            <FormInput
              label="Email"
              icon="mail-outline"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              onBlur={() => handleBlur("email")}
              placeholder="ejemplo@email.com"
              error={errors.email}
              touched={touched.email}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoFocus={true}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
            <FormInput
              label="Contraseña"
              icon="lock-closed-outline"
              value={formData.password}
              onChangeText={(value) => updateFormData("password", value)}
              onBlur={() => handleBlur("password")}
              placeholder="Tu contraseña"
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
              autoCapitalize="none"
              autoComplete="password"
              ref={passwordRef}
              onSubmitEditing={handleLogin}
              returnKeyType="done"
            />

            <TouchableOpacity
              onPress={handleForgotPassword}
              style={styles.forgotButton}
            >
              <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <AuthButton
              title="Iniciar Sesión"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
            />

            <TouchableOpacity
              style={styles.registerButton}
              onPress={handleRegister}
            >
              <Text style={styles.registerButtonText}>
                ¿No tenés cuenta? Registrate
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    fontFamily: "Inter_28pt-Bold",
    fontSize: 32,
    color: colors.black,
    marginBottom: 2,
  },
  microcopy: {
    fontSize: 15,
    fontFamily: "Inter_18pt-Regular",
    color: colors.gray,
    textAlign: "center",
    marginBottom: 16,
    marginTop: -6,
  },
  form: {
    marginBottom: 32,
    gap: 20,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -8,
  },
  forgotText: {
    fontFamily: "Inter_18pt-Medium",
    fontSize: 14,
    color: colors.primary,
  },
  registerButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  registerButtonText: {
    fontFamily: "Inter_18pt-SemiBold",
    fontSize: 16,
    color: colors.primary,
  },
});
