import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./navigation/root";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import { useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "./store/useAuthStore";
import FlashMessage from "react-native-flash-message";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const [user, isLoggedIn] = useAuthStore((state) => [
    state.user,
    state.isLoggedIn,
  ]);

  useEffect(() => {
    console.log(user);
    console.log(isLoggedIn);
  }, [user, isLoggedIn]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar style="auto" />
        <RootNavigation />
        <FlashMessage
          position="top"
          animated
          statusBarHeight={40}
          titleStyle={{ fontFamily: "InterMedium", fontSize: 16 }}
          duration={3000}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
