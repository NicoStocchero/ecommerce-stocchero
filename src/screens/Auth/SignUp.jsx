import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Keyboard,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSignUpMutation } from "../../services/auth/authApi";
import { authSuccess, authFailure } from "../../features/auth/authSlice";
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
} from "../../components/Auth";
import { getFirebaseErrorMessage } from "../../utils/firebaseErrorMessage";

const SignUp = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState(emptyErrors(formData));
  const [touched, setTouched] = useState({});

  // Refs para navegación con returnKey
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [signUp, { isLoading, error: apiError }] = useSignUpMutation();

  useEffect(() => {
    if (isAuthenticated) navigation.navigate("Shop");
  }, [isAuthenticated, navigation]);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field] && touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errorMsg = validateField(signUpSchema, formData, field);
    setErrors((prev) => ({ ...prev, [field]: errorMsg }));
  };

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
    setErrors(emptyErrors(data));
    return true;
  };

  const handleSignUp = async () => {
    Keyboard.dismiss();
    if (!validateForm(formData)) return;

    const result = await signUp({
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
      const errorMessage = getFirebaseErrorMessage(result.error, "signup");
      dispatch(authFailure(errorMessage));
      if (result.error.data?.error?.message === "EMAIL_EXISTS") {
        setErrors((prev) => ({ ...prev, email: errorMessage }));
        setTouched((prev) => ({ ...prev, email: true }));
      }
    }
  };

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
            />
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
    fontSize: 32,
    fontFamily: "Inter_28pt-Bold",
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
  footer: {
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    fontFamily: "Inter_18pt-Regular",
    color: colors.gray,
  },
  linkText: {
    color: colors.primary,
    fontFamily: "Inter_18pt-SemiBold",
  },
});
