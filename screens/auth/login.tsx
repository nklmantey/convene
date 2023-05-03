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

export default function LoginScreen() {
  const { navigate }: any = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();

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
          welcome back to syncUp
        </HeadingText>
        <SubHeadingText onPress={() => navigate("signup")}>
          don't have an account? create one now
        </SubHeadingText>
      </View>

      <View style={{ marginTop: 32, gap: 16 }}>
        <Input placeholder="email address" onChangeText={() => {}} />
        <View>
          <PwdInput placeholder="password" onChangeText={() => {}} />
          <SubHeadingText>forgot password? reset</SubHeadingText>
        </View>
      </View>

      <View
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
          alignSelf: "center",
        }}
      >
        <PrimaryButton title="login" onPress={() => {}} />
      </View>
    </View>
  );
}
