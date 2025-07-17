import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../global/colors";
import { authService } from "../../services/authService";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  clearError,
} from "../../features/auth/authSlice";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { isLoading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  // Navegar si ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      // Resetear formulario
      setEmail("");
      setPassword("");
      // Aquí puedes navegar a tu pantalla principal
      // navigation.replace("Main"); // o el nombre de tu stack principal
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    if (!email.includes("@")) {
      Alert.alert("Error", "Por favor ingresa un email válido");
      return;
    }

    // Limpiar errores previos
    dispatch(clearError());

    // Iniciar proceso de login
    dispatch(loginStart());

    try {
      const result = await authService.signIn(email, password);

      if (result.success) {
        // Login exitoso
        dispatch(
          loginSuccess({
            user: result.user,
            token: result.user.token,
            refreshToken: result.user.refreshToken,
          })
        );

        Alert.alert("Éxito", "Sesión iniciada correctamente");
      } else {
        // Login fallido
        dispatch(loginFailure(result.error));
        Alert.alert("Error", result.error || "No se pudo iniciar sesión");
      }
    } catch (loginError) {
      dispatch(loginFailure("Error de conexión"));
      Alert.alert("Error", "Error de conexión. Inténtalo de nuevo.");
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert(
        "Email requerido",
        "Por favor ingresa tu email para recuperar la contraseña"
      );
      return;
    }

    try {
      const result = await authService.resetPassword(email);

      if (result.success) {
        Alert.alert(
          "Email enviado",
          "Se ha enviado un enlace de recuperación a tu email"
        );
      } else {
        Alert.alert("Error", result.error || "No se pudo enviar el email");
      }
    } catch (resetError) {
      Alert.alert("Error", "Error al enviar email de recuperación");
    }
  };

  const handleRegister = () => {
    // Navegar a pantalla de registro
    navigation.navigate("Register");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <Text style={styles.subtitle}>
            Bienvenido de vuelta a tu tienda favorita
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="ejemplo@email.com"
              placeholderTextColor={colors.gray}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Tu contraseña"
              placeholderTextColor={colors.gray}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize="none"
              autoCorrect={false}
              editable={!isLoading}
            />
          </View>

          <Pressable onPress={handleForgotPassword} style={styles.forgotButton}>
            <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
          </Pressable>

          <Pressable
            style={[
              styles.loginButton,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Text>
          </Pressable>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <Pressable style={styles.registerButton} onPress={handleRegister}>
            <Text style={styles.registerButtonText}>
              ¿No tienes cuenta? Regístrate
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontFamily: "Inter-Bold",
    fontSize: 28,
    color: colors.gray900,
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
    textAlign: "center",
    lineHeight: 22,
  },
  errorContainer: {
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  errorText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
  form: {
    gap: 20,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontFamily: "Inter-SemiBold",
    fontSize: 14,
    color: colors.gray900,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.gray300,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: "Inter-Regular",
    color: colors.gray900,
    backgroundColor: colors.white,
  },
  forgotButton: {
    alignSelf: "flex-end",
    marginTop: -8,
  },
  forgotText: {
    fontFamily: "Inter-Medium",
    fontSize: 14,
    color: colors.primary,
  },
  loginButton: {
    backgroundColor: colors.black,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  loginButtonDisabled: {
    backgroundColor: colors.gray,
    shadowOpacity: 0,
    elevation: 0,
  },
  loginButtonText: {
    fontFamily: "Inter-Bold",
    fontSize: 16,
    color: colors.white,
    textTransform: "uppercase",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.gray300,
  },
  dividerText: {
    fontFamily: "Inter-Regular",
    fontSize: 14,
    color: colors.gray,
    marginHorizontal: 16,
  },
  registerButton: {
    paddingVertical: 16,
    alignItems: "center",
  },
  registerButtonText: {
    fontFamily: "Inter-SemiBold",
    fontSize: 16,
    color: colors.primary,
  },
});
