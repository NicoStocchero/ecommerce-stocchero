import { StyleSheet, View, Text } from "react-native";
import { colors } from "../global/colors";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.white,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    borderRadius: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  title: {
    color: colors.black,
    fontSize: 20,
    fontWeight: "bold",
  },
});
