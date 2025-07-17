// src/components/FlatCard.jsx
import { StyleSheet, View } from "react-native";
import colors from "../global/colors";

const FlatCard = ({ children, style }) => (
  <View style={{ ...styles.container, ...style }}>{children}</View>
);

export default FlatCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
});
