import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/login";
import SignupScreen from "../screens/auth/signup";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontFamily: "InterBold",
          fontSize: 24,
          color: "#000",
        },
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{ title: "create account" }}
      />
    </Stack.Navigator>
  );
}
