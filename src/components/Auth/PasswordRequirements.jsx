/**
 * @fileoverview Password requirements feedback component.
 * Shows password requirements with visual indicators in a clean, non-intrusive way.
 * @author Stocchero
 * @version 1.0.0
 */

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../global/colors";

/**
 * PasswordRequirements component props
 * @typedef {Object} PasswordRequirementsProps
 * @property {string} password - Current password value
 * @property {boolean} [show=false] - Whether to show the requirements
 */

/**
 * Password requirements feedback component.
 * Shows password requirements with visual indicators that update in real-time.
 * Only appears when user is actively typing password and provides non-intrusive feedback.
 *
 * @component
 * @param {PasswordRequirementsProps} props - Component props
 * @returns {React.JSX.Element|null} Rendered requirements component or null
 *
 * @example
 * ```javascript
 * <PasswordRequirements
 *   password={password}
 *   show={isPasswordFocused}
 * />
 * ```
 */
const PasswordRequirements = ({ password, show = false }) => {
  if (!show || !password) return null;

  const requirements = [
    {
      id: "length",
      text: "8+ caracteres",
      met: password.length >= 8,
    },
    {
      id: "uppercase",
      text: "Mayúscula",
      met: /[A-Z]/.test(password),
    },
    {
      id: "lowercase",
      text: "Minúscula",
      met: /[a-z]/.test(password),
    },
    {
      id: "number",
      text: "Número",
      met: /[0-9]/.test(password),
    },
    {
      id: "special",
      text: "Especial",
      met: /[^A-Za-z0-9]/.test(password),
    },
  ];

  const metCount = requirements.filter((req) => req.met).length;
  const progressPercentage = (metCount / requirements.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View
            style={[styles.progressFill, { width: `${progressPercentage}%` }]}
          />
        </View>
        <Text style={styles.progressText}>
          {metCount}/{requirements.length} requisitos
        </Text>
      </View>

      <View style={styles.requirementsList}>
        {requirements.map((req) => (
          <View key={req.id} style={styles.requirementItem}>
            <Ionicons
              name={req.met ? "checkmark-circle" : "ellipse-outline"}
              size={14}
              color={req.met ? colors.success : colors.gray400}
              style={styles.requirementIcon}
            />
            <Text
              style={[styles.requirementText, req.met && styles.requirementMet]}
            >
              {req.text}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    paddingHorizontal: 2,
  },
  progressContainer: {
    marginBottom: 8,
  },
  progressBar: {
    height: 3,
    backgroundColor: colors.gray200,
    borderRadius: 2,
    marginBottom: 4,
  },
  progressFill: {
    height: "100%",
    backgroundColor: colors.success,
    borderRadius: 2,
  },
  progressText: {
    fontSize: 11,
    fontFamily: "Inter_18pt-Regular",
    color: colors.gray500,
    textAlign: "center",
  },
  requirementsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "center",
  },
  requirementItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.gray50,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  requirementIcon: {
    marginRight: 4,
  },
  requirementText: {
    fontSize: 10,
    fontFamily: "Inter_18pt-Regular",
    color: colors.gray600,
  },
  requirementMet: {
    color: colors.success,
    fontFamily: "Inter_18pt-Medium",
  },
});

export default PasswordRequirements;
