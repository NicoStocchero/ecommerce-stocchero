import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorContainer: {
    backgroundColor: colors.error,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: "Inter_18pt-Medium",
    fontSize: 14,
    color: colors.white,
    textAlign: "center",
  },
});

export default ErrorMessage;
