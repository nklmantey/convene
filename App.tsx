import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./navigation/root";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";

const App = () => {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <RootNavigation />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
