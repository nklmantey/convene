import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import RootNavigation from "./navigation/root";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import { useEffect } from "react";
import { useAuthStore } from "./store/useAuthStore";
import FlashMessage from "react-native-flash-message";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function App() {
  const isLoadingComplete = useCachedResources();
  const user = useAuthStore((state) => state.user);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <RootNavigation />
      <FlashMessage
        position="top"
        animated
        statusBarHeight={40}
        titleStyle={{ fontFamily: "InterSoftMedium", fontSize: 16 }}
        duration={3000}
      />
    </SafeAreaProvider>
  );
}
