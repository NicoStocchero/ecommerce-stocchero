/**
 * @fileoverview SignUp screen component for user registration.
 * Handles user registration with email/password confirmation, validation, and navigation to login.
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
  Text,
  Keyboard,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignUpMutation } from "../../services/auth/authApi";
import { authSuccess, authFailure } from "../../features/user/userSlice";
import colors from "../../global/colors";
import { signUpSchema } from "../../schemas/authSchema";
import {
  mapZodErrors,
  validateField,
  emptyErrors,
} from "../../utils/validationHelpers";
import {
  FormInput,
  ErrorMessage,
  AuthDivider,
  AuthButton,
  PasswordRequirements,
} from "../../components/Auth";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrorMessage";

/**
 * SignUp screen component props
 * @typedef {Object} SignUpProps
 * @property {Object} navigation - React Navigation object for screen navigation
 * @property {function} navigation.navigate - Function to navigate to other screens
 */

/**
 * SignUp screen component for user registration.
 * Provides a complete registration form with email, password, and password confirmation fields.
 * Includes comprehensive validation, error handling, and automatic navigation on success.
 *
 * Features:
 * - Strict password validation with security requirements
 * - Password confirmation matching validation
 * - Password visibility toggles for both fields
 * - Real-time form validation with Zod schema
 * - Firebase authentication integration
 * - Field-specific error display
 * - Keyboard navigation between fields
 * - Responsive design with keyboard avoidance
 *
 * @component
 * @param {SignUpProps} props - Component props
 * @returns {React.JSX.Element} Rendered signup screen
 *
 * @example
 * ```javascript
 * // Used in AuthStack navigator
 * <Stack.Screen name="SignUp" component={SignUp} />
 *
 * // Navigation from Login screen
 * navigation.navigate("SignUp");
 * ```
 */
const SignUp = ({ navigation }) => {
  // Form state management
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState(emptyErrors(formData));
  const [touched, setTouched] = useState({});
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Refs for keyboard navigation
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Redux hooks
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.user);
  const [signUp, { isLoading, error: apiError }] = useSignUpMutation();

  /**
   * Validates email field specifically
   * @param {string} email - Email to validate
   * @returns {string} Error message or empty string if valid
   */
  const validateEmail = (email) => {
    if (!email || email.trim() === "") {
      return "El email es requerido";
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Ingresa un email válido";
    }

    return "";
  };

  /**
   * Updates form data and clears field errors when user types
   * @param {string} field - Form field name to update
   * @param {string} value - New field value
   */
  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
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

    // Hide password requirements when leaving password field
    if (field === "password") {
      setIsPasswordFocused(false);
    }

    let errorMsg = "";

    // Field-specific validation
    if (field === "email") {
      errorMsg = validateEmail(formData.email);
    } else if (field === "password") {
      errorMsg = validateField(signUpSchema, formData, field);

      // Special validation for password to check if confirmPassword matches when both are filled
      if (
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
      ) {
        setErrors((prev) => ({
          ...prev,
          [field]: errorMsg,
          confirmPassword: "Las contraseñas no coinciden",
        }));
        return;
      }
    } else if (field === "confirmPassword") {
      errorMsg = validateField(signUpSchema, formData, field);

      // Special validation for confirmPassword to check if it matches password
      if (
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword
      ) {
        errorMsg = "Las contraseñas no coinciden";
      }
    }

    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

  /**
   * Validates entire form using Zod schema including password confirmation
   * @param {Object} data - Form data to validate
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = (data) => {
    const result = signUpSchema.safeParse(data);
    if (!result.success) {
      setErrors(mapZodErrors(result));
      setTouched({
        email: true,
        password: true,
        confirmPassword: true,
      });
      return false;
    }

    // Additional validation for password confirmation
    if (data.password !== data.confirmPassword) {
      setErrors({
        email: "",
        password: "",
        confirmPassword: "Las contraseñas no coinciden",
      });
      setTouched({
        email: true,
        password: true,
        confirmPassword: true,
      });
      return false;
    }

    setErrors(emptyErrors(data));
    return true;
  };

  /**
   * Handles signup form submission
   * Validates form, calls signup API, and navigates to login on success
   */
  const handleSignUp = async () => {
    try {
      Keyboard.dismiss();
      if (!validateForm(formData)) return;

      const result = await signUp({
        email: formData.email,
        password: formData.password,
        returnSecureToken: true,
      });

      if (result.data) {
        // Show success message and navigate to login
        Alert.alert(
          "Cuenta Creada",
          "Tu cuenta ha sido creada exitosamente. Por favor, inicia sesión.",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate("Login"),
            },
          ]
        );
      }
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error, "signup");
      dispatch(authFailure(errorMessage));
    }
  };

  /**
   * Navigates to Login screen
   */
  const navigateToLogin = () => navigation.navigate("Login");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Crear Cuenta</Text>
            <Text style={styles.microcopy}>
              Registrate para empezar a comprar en Tienda Renace
            </Text>
          </View>

          <ErrorMessage
            message={apiError && getFirebaseErrorMessage(apiError)}
          />

          <View style={styles.form}>
            <FormInput
              label="Email"
              icon="mail-outline"
              value={formData.email}
              onChangeText={(value) => updateFormData("email", value)}
              onBlur={() => handleBlur("email")}
              placeholder="Ingresa tu email"
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
              onFocus={() => setIsPasswordFocused(true)}
              placeholder="Ingresa tu contraseña"
              error={errors.password}
              touched={touched.password}
              secureTextEntry
              showPassword={showPassword}
              togglePasswordVisibility={() => setShowPassword(!showPassword)}
              autoCapitalize="none"
              autoComplete="new-password"
              ref={passwordRef}
              returnKeyType="next"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            >
              <PasswordRequirements
                password={formData.password}
                show={isPasswordFocused && formData.password.length > 0}
              />
            </FormInput>
            <FormInput
              label="Confirmar Contraseña"
              icon="lock-closed-outline"
              value={formData.confirmPassword}
              onChangeText={(value) => updateFormData("confirmPassword", value)}
              onBlur={() => handleBlur("confirmPassword")}
              placeholder="Confirma tu contraseña"
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
              secureTextEntry
              showPassword={showConfirmPassword}
              togglePasswordVisibility={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              autoCapitalize="none"
              autoComplete="new-password"
              ref={confirmPasswordRef}
              onSubmitEditing={handleSignUp}
              returnKeyType="done"
            />

            <AuthButton
              title="Crear Cuenta"
              onPress={handleSignUp}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>

          <AuthDivider />

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              ¿Ya tenés cuenta?{" "}
              <Text style={styles.linkText} onPress={navigateToLogin}>
                Inicia sesión
              </Text>
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray50,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: "Inter_28pt-Bold",
    color: colors.textPrimary,
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: "center",
  },
  microcopy: {
    fontSize: 16,
    fontFamily: "Inter_18pt-Regular",
    color: colors.gray600,
    textAlign: "center",
    lineHeight: 22,
    letterSpacing: 0.2,
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 24,
    marginHorizontal: 20,
    gap: 20,
    borderWidth: 1,
    borderColor: colors.gray100,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  footer: {
    alignItems: "center",
    marginTop: 24,
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    backgroundColor: colors.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray100,
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Inter_18pt-Regular",
    color: colors.gray600,
    letterSpacing: 0.2,
  },
  linkText: {
    color: colors.primary,
    fontFamily: "Inter_18pt-SemiBold",
    letterSpacing: 0.3,
  },
});
