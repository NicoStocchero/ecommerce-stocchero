// App.jsx
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import RootNavigator from "./src/navigation/RootNavigator";
import { store } from "./src/store/store";
import { SQLiteProvider } from "expo-sqlite";
import { migrateDatabase } from "./src/utils/sqlite";

const App = () => {
  const [fontsLoaded, error] = useFonts({
    // eslint-disable-next-line global-require
    "Inter_18pt-Regular": require("./assets/fonts/Inter_18pt-Regular.ttf"),
    // eslint-disable-next-line global-require
    "Inter_18pt-Bold": require("./assets/fonts/Inter_18pt-Bold.ttf"),
    // eslint-disable-next-line global-require
    "Inter_18pt-Medium": require("./assets/fonts/Inter_18pt-Medium.ttf"),
    // eslint-disable-next-line global-require
    "Inter_18pt-SemiBold": require("./assets/fonts/Inter_18pt-SemiBold.ttf"),
    // eslint-disable-next-line global-require
    "Inter_28pt-Bold": require("./assets/fonts/Inter_28pt-Bold.ttf"),
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
    <SQLiteProvider databaseName="ecommerce-app.db" onInit={migrateDatabase}>
      <Provider store={store}>
        <StatusBar />
        <RootNavigator />
      </Provider>
    </SQLiteProvider>
  );
};

export default App;
