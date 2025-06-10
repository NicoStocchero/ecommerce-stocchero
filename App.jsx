import { StyleSheet, View, FlatList, Image, Text } from "react-native";
import Header from "./src/components/Header";
import FlatCard from "./src/components/FlatCard";

import categories from "./src/data/categories.json";
import { colors } from "./src/global/colors";

export default function App() {
  const renderCategoryItem = ({ item }) => (
    <FlatCard>
      <View style={styles.categoryItem}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </FlatCard>
  );
  return (
    <>
      <View style={styles.container}>
        <Header title="Marketplace" />
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginRight: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginRight: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.black,
    textAlign: "left",
    marginLeft: 10,
  },
});
