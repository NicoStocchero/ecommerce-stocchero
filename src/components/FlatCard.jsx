import { StyleSheet, View, Text, Image } from "react-native";
import { colors } from "../global/colors";

const FlatCard = ({ children, style }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

export default FlatCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },
});
