import { createStackNavigator } from "@react-navigation/stack";
import { View } from "react-native";
import { useState } from "react";
import { TransitionPresets } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/login";
import SignupScreen from "../screens/auth/signup";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigation() {
  // const { canGoBack, goBack } = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
