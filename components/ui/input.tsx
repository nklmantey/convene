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
            borderColor: "#d3d3d3",
            backgroundColor: "#fff",
            color: "#000",
          },
        ]}
      />
    </View>
  );
};

const PwdInput = ({ placeholder, onChangeText }: InputProps) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          alignSelf: "center",
          borderColor: "#d3d3d3",
          borderWidth: 1,
          justifyContent: "space-between",
          borderRadius: 8,
          backgroundColor: "#fff",
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
              width: "85%",
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
            color={"#000"}
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
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
    fontFamily: "InterMedium",
  },
});
