import React, { useState, forwardRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../global/colors";

const FormInput = forwardRef(
  (
    {
      label,
      icon,
      value,
      onChangeText,
      onBlur,
      placeholder,
      error,
      touched,
      secureTextEntry = false,
      showPassword,
      togglePasswordVisibility,
      keyboardType = "default",
      autoCapitalize = "none",
      autoComplete = "off",
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    return (
      <View style={styles.inputContainer}>
        {label && <Text style={styles.label}>{label}</Text>}
        <View
          style={[
            styles.inputWrapper,
            error && touched && styles.inputError,
            isFocused && styles.inputFocused,
          ]}
        >
          {icon && (
            <Ionicons
              name={icon}
              size={20}
              color={error && touched ? colors.error : colors.gray}
              style={styles.inputIcon}
            />
          )}
          <TextInput
            style={styles.input}
            accessible
            accessibilityLabel={label}
            ref={ref}
            placeholder={placeholder}
            placeholderTextColor={colors.gray}
            value={value}
            onChangeText={onChangeText}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur && onBlur(e);
            }}
            onFocus={() => setIsFocused(true)}
            secureTextEntry={secureTextEntry && !showPassword}
            keyboardType={keyboardType}
            autoCapitalize={autoCapitalize}
            autoComplete={autoComplete}
            {...props}
          />
          {secureTextEntry &&
            typeof togglePasswordVisibility === "function" && (
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={styles.eyeIcon}
                accessible
                accessibilityLabel={
                  showPassword ? "Ocultar contraseña" : "Mostrar contraseña"
                }
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={colors.gray}
                />
              </TouchableOpacity>
            )}
        </View>
        {error && touched && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  inputContainer: { marginBottom: 20 },
  label: {
    fontSize: 14,
    fontFamily: "Inter_18pt-SemiBold",
    color: colors.black,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 12,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    height: 56,
  },
  inputFocused: { borderColor: colors.primary },
  inputError: { borderColor: colors.error },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter_18pt-Regular",
    color: colors.black,
  },
  eyeIcon: { padding: 4 },
  errorText: {
    fontSize: 12,
    fontFamily: "Inter_18pt-Regular",
    color: colors.error,
    marginTop: 4,
  },
});

export default FormInput;
