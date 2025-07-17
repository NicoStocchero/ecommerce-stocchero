// components/Auth/AuthDivider.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../global/colors";

const AuthDivider = () => (
  <View style={styles.divider}>
    <View style={styles.line} />
    <Text style={styles.text}>o</Text>
    <View style={styles.line} />
  </View>
);

const styles = StyleSheet.create({
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  line: { flex: 1, height: 1, backgroundColor: colors.gray },
  text: {
    marginHorizontal: 10,
    fontFamily: "Inter_18pt-Regular",
    color: colors.gray,
    fontSize: 16,
  },
});

export default AuthDivider;
