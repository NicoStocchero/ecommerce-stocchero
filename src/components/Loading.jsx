// src/components/Loading.jsx
import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import colors from "../global/colors";

const Loading = ({
  text = "Cargando...",
  size = "large",
  fullScreen = true,
}) => {
  return (
    <View style={fullScreen ? styles.fullScreen : styles.inline}>
      <ActivityIndicator size={size} color={colors.primary} />
      {text && <Text style={styles.text}>{text}</Text>}
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inline: {
    paddingVertical: 12,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: colors.gray,
  },
});
