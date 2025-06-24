import { Pressable, Text, StyleSheet, Platform } from "react-native";
import { colors } from "../global/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.button}>
      <Ionicons
        name={Platform.OS === "ios" ? "chevron-back" : "arrow-back"}
        size={24}
        color={colors.white}
      />
      <Text style={styles.text}>Back</Text>
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 12,
    alignSelf: "flex-start",
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
});
