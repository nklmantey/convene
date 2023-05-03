import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import AuthNavigation from "./auth";
import HomeNavigation from "./home";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "../store/useAuthStore";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        {isLoggedIn ? (
          <Stack.Screen name="home-stack" component={HomeNavigation} />
        ) : (
          <Stack.Screen name="auth-stack" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
