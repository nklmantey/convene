import { View, Text } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import { HeadingText, SubHeadingText } from "../../components/styled-text";
import { Input, PwdInput } from "../../components/ui/input";
import { PrimaryButton } from "../../components/ui/button";
import { useNavigation } from "@react-navigation/native";
import { useAuthStore } from "../../store/useAuthStore";
import { useState } from "react";

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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
          hey there, welcome to convene
        </HeadingText>
        <SubHeadingText onPress={() => navigate("login")}>
          already have an account? login
        </SubHeadingText>
      </View>

      <View style={{ marginTop: 32, gap: 16 }}>
        <Input
          placeholder="full name"
          onChangeText={(e) => setFullName(e)}
          value={fullName}
        />
        <Input
          placeholder="email address"
          onChangeText={(e) => setEmail(e)}
          value={email}
        />
        <PwdInput
          placeholder="password"
          onChangeText={(e) => setPassword(e)}
          value={password}
        />
        <PwdInput
          placeholder="confirm password"
          onChangeText={(e) => setConfirmPassword(e)}
          value={confirmPassword}
        />
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
