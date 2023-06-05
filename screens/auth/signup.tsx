import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import useDimensions from "../../hooks/useDimensions";
import {
  BoldText,
  HeadingText,
  SubHeadingText,
} from "../../components/styled-text";
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
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function SignupScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<string | null>("");

  const { navigate }: NavigationProp<AuthStackParamList> = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();

  async function selectImageFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

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
        avatar: image,
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
            setImage("");
          })
          .catch((error) => {
            if (error.code === "auth/email-already-in-use") {
              showMessage({
                message: "user already exists, go to login!",
                type: "danger",
                icon: "danger",
              });
            }
          });

        setLoading(false);
      } catch (e) {
        showMessage({
          message: "failed to create account!",
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
        <View
          style={{
            gap: 8,
            alignItems: "center",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity
            onPress={selectImageFromGallery}
            style={{
              width: 120,
              height: 120,
              borderRadius: 60,
              borderWidth: 1,
              borderStyle: "dashed",
              borderColor: "#d3d3d3",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {image ? (
              <Image
                source={{ uri: image }}
                style={{ width: 120, height: 120, borderRadius: 60 }}
                resizeMode="cover"
              />
            ) : (
              <Ionicons name="ios-person-outline" size={20} color={"#000"} />
            )}
          </TouchableOpacity>
          <BoldText>upload an avatar</BoldText>
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
        <PrimaryButton
          title={loading ? <ActivityIndicator color={"#fff"} /> : "sign up"}
          onPress={handleSignup}
        />
      </View>
    </View>
  );
}
