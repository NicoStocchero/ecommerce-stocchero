/**
 * @fileoverview Reusable form input component with validation and accessibility support.
 * Features include password visibility toggle, error states, and keyboard navigation.
 * @author Stocchero
 * @version 1.0.0
 */

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

/**
 * FormInput component props
 * @typedef {Object} FormInputProps
 * @property {string} [label] - Label text displayed above the input
 * @property {string} [icon] - Ionicons icon name for the left side of input
 * @property {string} value - Current input value
 * @property {function} onChangeText - Callback when text changes
 * @property {function} [onBlur] - Callback when input loses focus
 * @property {string} [placeholder] - Placeholder text
 * @property {string} [error] - Error message to display
 * @property {boolean} [touched] - Whether the field has been touched/focused
 * @property {boolean} [secureTextEntry=false] - Whether to hide text (password field)
 * @property {boolean} [showPassword] - Current password visibility state
 * @property {function} [togglePasswordVisibility] - Callback to toggle password visibility
 * @property {string} [keyboardType="default"] - Keyboard type for input
 * @property {string} [autoCapitalize="none"] - Auto-capitalization behavior
 * @property {string} [autoComplete="off"] - Auto-complete behavior
 */

/**
 * Reusable form input component with validation, error handling, and accessibility.
 * Supports password fields with visibility toggle and various input configurations.
 *
 * @component
 * @param {FormInputProps} props - Component props
 * @param {React.Ref} ref - Forwarded ref for focus management
 * @returns {React.JSX.Element} Rendered form input component
 *
 * @example
 * ```javascript
 * <FormInput
 *   label="Email"
 *   icon="mail-outline"
 *   value={email}
 *   onChangeText={setEmail}
 *   onBlur={() => validateEmail()}
 *   placeholder="ejemplo@email.com"
 *   error={emailError}
 *   touched={emailTouched}
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 * />
 *
 * // Password field example
 * <FormInput
 *   label="Contraseña"
 *   icon="lock-closed-outline"
 *   value={password}
 *   onChangeText={setPassword}
 *   secureTextEntry
 *   showPassword={showPassword}
 *   togglePasswordVisibility={() => setShowPassword(!showPassword)}
 * />
 * ```
 */
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
            autoCorrect={false}
            spellCheck={false}
            textContentType="none"
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

// Set display name for debugging
FormInput.displayName = "FormInput";

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
