import { createStackNavigator } from "@react-navigation/stack";
import { TransitionPresets } from "@react-navigation/stack";
import LoginScreen from "../screens/auth/login";
import SignupScreen from "../screens/auth/signup";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Stack = createStackNavigator<AuthStackParamList>();

export default function AuthNavigation() {
  const { goBack } = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerLeft: () => null,
        headerStyle: {
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
        },
        headerTitleStyle: {
          fontFamily: "InterBold",
          fontSize: 24,
          color: "#000",
        },
      }}
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="signup"
        component={SignupScreen}
        options={{
          title: "create account",
          headerLeft: () => (
            <TouchableOpacity
              style={{
                marginLeft: 16,
                width: 30,
                height: 30,
                borderRadius: 8,
                backgroundColor: "#eee",
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => goBack()}
            >
              <Ionicons name="ios-arrow-down" size={15} color={"coral"} />
            </TouchableOpacity>
          ),
          ...TransitionPresets.ModalPresentationIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "vertical",
        }}
      />
    </Stack.Navigator>
  );
}
