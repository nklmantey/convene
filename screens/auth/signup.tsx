import { View, Text, ActivityIndicator } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import { HeadingText, SubHeadingText } from "../../components/styled-text";
import { Input, PwdInput } from "../../components/ui/input";
import { PrimaryButton } from "../../components/ui/button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  validateEmail,
  validateMatchPassword,
  validatePassword,
} from "../../utils/validateInput";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { showMessage } from "react-native-flash-message";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();

  async function handleSignup() {
    // input validation
    password === "" || email === "" || confirmPassword === "" || username === ""
      ? showMessage({
          message: "please fill in all fields!",
          type: "danger",
          icon: "danger",
        })
      : validateEmail(email.trim())
      ? validatePassword(password) || validatePassword(confirmPassword)
        ? validateMatchPassword(password, confirmPassword)
          ? await createAccount()
          : showMessage({
              message: "your passwords do not match!",
              type: "danger",
              icon: "danger",
            })
        : showMessage({
            message: "your password is less than 8 characters!",
            type: "danger",
            icon: "danger",
          })
      : showMessage({
          message: "make sure your email is in the right format!",
          type: "danger",
          icon: "danger",
        });

    // add user to firestore database
    async function addUserToDb(uid: string) {
      await setDoc(doc(db, "users", uid), {
        email: email.trim(),
        username: username,
      });
    }

    // create the user account in auth
    async function createAccount() {
      setLoading(true);

      try {
        await createUserWithEmailAndPassword(auth, email.trim(), password)
          .then(async (credentials) => {
            await addUserToDb(credentials?.user?.uid);
            showMessage({
              message: "account created successfully!",
              type: "success",
              icon: "success",
            });
            navigate("login");
          })
          .finally(() => {
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setUsername("");
          })
          .catch((error) => {
            console.log(error);
          });

        setLoading(false);
      } catch (e) {
        console.log("something went wrong:", e);
      }
    }
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
          hey there, welcome to convene
        </HeadingText>
        <SubHeadingText onPress={() => navigate("login")}>
          already have an account? login
        </SubHeadingText>
      </View>

      <View style={{ marginTop: 32, gap: 16 }}>
        <Input
          placeholder="create a unique username"
          onChangeText={(e) => setUsername(e)}
          value={username}
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
        <PrimaryButton
          title={loading ? <ActivityIndicator color={"#fff"} /> : "sign up"}
          onPress={() => handleSignup()}
        />
      </View>
    </View>
  );
}
