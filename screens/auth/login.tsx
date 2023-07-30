import { ActivityIndicator, View } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import { HeadingText, SubHeadingText } from "../../components/styled-text";
import { Input, PwdInput } from "../../components/ui/input";
import { PrimaryButton } from "../../components/ui/button";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useAuthStore } from "../../store/useAuthStore";
import { validateEmail, validatePassword } from "../../utils/validateInput";
import { showMessage } from "react-native-flash-message";
import { User, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();
  const setUser = useAuthStore((state) => state.setUser);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  async function handleLogin() {
    // input validation
    password === "" || email === ""
      ? showMessage({
          message: "please fill in all fields!",
          type: "danger",
          icon: "danger",
        })
      : validateEmail(email.trim())
      ? validatePassword(password)
        ? await loginUser()
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

    // fetch user data from the db & set states
    async function fetchUser(user: User) {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUser({
          uid: user.uid,
          email: user.email!,
          username: docSnap.data().username,
          avatar: docSnap.data().avatar,
        });
      } else {
        showMessage({
          message: "no document found!",
          type: "danger",
          icon: "danger",
        });
      }
      return;
    }

    async function loginUser() {
      setLoading(true);

      try {
        await signInWithEmailAndPassword(auth, email.trim(), password)
          .then(async (credentials) => {
            const user = credentials.user;
            await fetchUser(user);
            showMessage({
              message: "successfully logged in!",
              type: "success",
              icon: "success",
            });
            setIsLoggedIn(true);
          })
          .finally(() => {
            setEmail("");
            setPassword("");
          })
          .catch((error) => {
            if (
              error.code === "auth/wrong-password" ||
              error.code === "auth/user-not-found"
            ) {
              showMessage({
                message: "invalid credentials, try again!",
                type: "danger",
                icon: "danger",
              });
            }
          });

        setLoading(false);
      } catch (e) {
        showMessage({
          message: "failed to log in!",
          type: "danger",
          icon: "danger",
        });
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
        justifyContent: "space-between",
        paddingVertical: 32,
      }}
    >
      <View>
        <HeadingText style={{ color: "coral" }}>
          welcome back to convene
        </HeadingText>
        <SubHeadingText onPress={() => navigate("signup")}>
          don't have an account? create one now
        </SubHeadingText>

        <View style={{ marginTop: 32, gap: 16 }}>
          <Input
            placeholder="email address"
            onChangeText={(e) => setEmail(e)}
            value={email}
          />
          <View style={{ gap: 8 }}>
            <PwdInput
              placeholder="password"
              onChangeText={(e) => setPassword(e)}
              value={password}
            />
            <SubHeadingText onPress={() => navigate("forgot-password")}>
              forgot password? reset it
            </SubHeadingText>
          </View>
        </View>
      </View>

      <PrimaryButton
        title={loading ? <ActivityIndicator color={"#fff"} /> : "login"}
        onPress={handleLogin}
      />
    </View>
  );
}
