import { StyleSheet, Text, View, Pressable } from "react-native";
import React, { useState } from "react";
import { colors } from "../global/colors"; // Asegurate de tener este import si usás colores globales

const ButtonCount = () => {
  const [count, setCount] = useState(1);

  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 1) setCount((prev) => prev - 1);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={handleDecrement}>
        <Text style={styles.buttonText}>–</Text>
      </Pressable>

      <Text style={styles.count}>{count}</Text>

      <Pressable style={styles.button} onPress={handleIncrement}>
        <Text style={styles.buttonText}>+</Text>
      </Pressable>
    </View>
  );
};

export default ButtonCount;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    justifyContent: "center",
    marginTop: 16,
  },
  button: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.black,
  },
  count: {
    fontSize: 18,
    fontFamily: "Inter-Bold",
    minWidth: 24,
    textAlign: "center",
    color: colors.black,
  },
});
