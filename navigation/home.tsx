import {
  TransitionPresets,
  createStackNavigator,
} from "@react-navigation/stack";
import HomeScreen from "../screens/home";
import AddEventScreen from "../screens/home/add-event";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "../components/styled-text";
import AddUnsplashImage from "../screens/home/unsplash";
import Settings from "../screens/home/settings";

const Stack = createStackNavigator<HomeStackParamList>();

const HomeNavigation = () => {
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
          fontFamily: "InterSoftBold",
          fontSize: 24,
          color: "#000",
        },
        ...TransitionPresets.SlideFromRightIOS,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen
        name="home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="add-event"
        component={AddEventScreen}
        options={({ navigation, route }) => ({
          title: "add event",
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
              onPress={goBack}
            >
              <Ionicons name="ios-arrow-down" size={15} color={"coral"} />
            </TouchableOpacity>
          ),
          ...TransitionPresets.ModalPresentationIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "vertical",
        })}
      />
      <Stack.Screen
        name="unsplash"
        component={AddUnsplashImage}
        options={({ navigation, route }) => ({
          title: "search unsplash",
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
              onPress={goBack}
            >
              <Ionicons name="ios-arrow-down" size={15} color={"coral"} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 16,
                borderRadius: 8,
                backgroundColor: "#fff",
                alignItems: "center",
                justifyContent: "center",
                padding: 4,
              }}
            >
              <BoldText style={{ color: "coral", fontSize: 16 }}>
                create
              </BoldText>
            </TouchableOpacity>
          ),
          ...TransitionPresets.ModalPresentationIOS,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "vertical",
        })}
      />
      <Stack.Screen
        name="settings"
        component={Settings}
        options={({ navigation, route }) => ({
          title: "settings",
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
              onPress={goBack}
            >
              <Ionicons name="ios-arrow-back" size={15} color={"coral"} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
