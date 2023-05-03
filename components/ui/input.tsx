import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { MediumText, RegularText } from "../styled-text";
import { Ionicons } from "@expo/vector-icons";

export type InputProps = {
  label?: string;
  placeholder?: string;
  onChangeText(e: any): void;
  maxLength?: number;
  style?: ViewStyle;
};

const Input = (props: InputProps) => {
  return (
    <View {...props} style={props.style}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor="gainsboro"
        onChangeText={props.onChangeText}
        style={[
          styles.input,
          {
            borderColor: "#F2F2F2B2",
            backgroundColor: "#09265D",
            color: "#fff",
          },
        ]}
      />
    </View>
  );
};

const PwdInput = ({ label, placeholder, onChangeText }: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View>
      <RegularText style={{ color: "#fff", marginBottom: 5 }}>
        {label}
      </RegularText>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          alignSelf: "center",
          borderColor: "#F2F2F2B2",
          borderWidth: 2,
          justifyContent: "space-between",
          borderRadius: 8,
          backgroundColor: "#09265D",
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={"gainsboro"}
          onChangeText={onChangeText}
          secureTextEntry={visible ? false : true}
          style={[
            styles.input,
            {
              borderWidth: 0,
              color: "#fff",
              width: "85%",
              borderRadius: 5,
            },
          ]}
        />

        <TouchableOpacity
          style={{
            marginHorizontal: 5,
            flex: 1,
            alignItems: "center",
          }}
          onPress={() => {
            setVisible((prev) => !prev);
          }}
        >
          <Ionicons
            name={visible ? "eye-off" : "eye"}
            color={"white"}
            size={20}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export { Input, PwdInput };

const styles = StyleSheet.create({
  input: {
    padding: 12,
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
    fontFamily: "InterMedium",
  },
});
