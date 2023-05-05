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
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navigate }: any = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  function handleLogin() {
    setUser({
      email: email,
      password: password,
    });
    setIsLoggedIn(true);
  }

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
          welcome back to convene
        </HeadingText>
        <SubHeadingText onPress={() => navigate("signup")}>
          don't have an account? create one now
        </SubHeadingText>
      </View>

      <View style={{ marginTop: 32, gap: 16 }}>
        <Input placeholder="email address" onChangeText={(e) => setEmail(e)} />
        <View>
          <PwdInput
            placeholder="password"
            onChangeText={(e) => setPassword(e)}
          />
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
        <PrimaryButton title="login" onPress={() => handleLogin()} />
      </View>
    </View>
  );
}
