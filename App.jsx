import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Categories from "./src/screens/Categories";
import Products from "./src/screens/Products";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import ProductDetail from "./src/screens/ProductDetail";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    "Inter-Regular": require("./assets/fonts/Inter_18pt-Regular.ttf"),
    "Inter-Bold": require("./assets/fonts/Inter_18pt-Bold.ttf"),
    "Inter-Medium": require("./assets/fonts/Inter_18pt-Medium.ttf"),
    "Inter-SemiBold": require("./assets/fonts/Inter_18pt-SemiBold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || error) {
      SplashScreen.hide();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Categories" component={Categories} />
        <Stack.Screen name="Products" component={Products} />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{ headerTitle: "" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
