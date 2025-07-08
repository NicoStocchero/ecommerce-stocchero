// App.jsx
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import TabNavigator from "./navigation/TabNavigator";
import store from "./src/store/store";

const App = () => {
  const [fontsLoaded, error] = useFonts({
    // eslint-disable-next-line global-require
    "Inter-Regular": require("./assets/fonts/Inter_18pt-Regular.ttf"),
    // eslint-disable-next-line global-require
    "Inter-Bold": require("./assets/fonts/Inter_18pt-Bold.ttf"),
    // eslint-disable-next-line global-require
    "Inter-Medium": require("./assets/fonts/Inter_18pt-Medium.ttf"),
    // eslint-disable-next-line global-require
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
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar style={{ backgroundColor: "auto" }} />
        <TabNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
