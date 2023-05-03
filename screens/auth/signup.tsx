import { View, Text } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import {
  BoldText,
  HeadingText,
  SemiBoldText,
  SubHeadingText,
} from "../../components/styled-text";
import { Input, PwdInput } from "../../components/ui/input";
import { PrimaryButton } from "../../components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";

export default function SignupScreen() {
  const { navigate }: any = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
        paddingVertical: 24,
      }}
    >
      <View>
        <HeadingText style={{ color: "coral" }}>
          hey there, welcome to syncUp
        </HeadingText>
        <SubHeadingText onPress={() => navigate("login")}>
          already have an account? login
        </SubHeadingText>
      </View>

      <View style={{ marginTop: 32, gap: 16 }}>
        <Input placeholder="full name" onChangeText={() => {}} />
        <Input placeholder="email address" onChangeText={() => {}} />
        <PwdInput placeholder="password" onChangeText={() => {}} />
        <PwdInput placeholder="confirm password" onChangeText={() => {}} />
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
          alignSelf: "center",
        }}
      >
        <PrimaryButton title="sign up" onPress={() => setIsLoggedIn(true)} />
      </View>
    </View>
  );
}
