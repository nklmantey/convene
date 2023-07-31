import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export type InputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText(e: any): void;
  maxLength?: number;
  style?: ViewStyle;
  multiline?: boolean;
  autoFocus?: boolean;
};

const Input = (props: InputProps) => {
  return (
    <View {...props} style={props.style}>
      <TextInput
        returnKeyType="done"
        placeholder={props.placeholder}
        placeholderTextColor="gainsboro"
        onChangeText={props.onChangeText}
        multiline={props.multiline}
        value={props.value}
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

const BorderlessInput = (props: InputProps) => {
  return (
    <View {...props} style={props.style}>
      <TextInput
        autoFocus={props.autoFocus}
        returnKeyType="done"
        multiline={props.multiline}
        blurOnSubmit={true}
        placeholder={props.placeholder}
        placeholderTextColor="gray"
        onChangeText={props.onChangeText}
        value={props.value}
        style={[
          styles.input,
          {
            paddingHorizontal: 0,
            borderWidth: 0,
            backgroundColor: "#fff",
            color: "#000",
            flex: 1,
          },
        ]}
      />
    </View>
  );
};

const PwdInput = ({ placeholder, onChangeText, value }: InputProps) => {
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
          returnKeyType="done"
          placeholder={placeholder}
          placeholderTextColor={"gainsboro"}
          onChangeText={onChangeText}
          value={value}
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

export { Input, PwdInput, BorderlessInput };

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    alignSelf: "center",
    fontFamily: "InterSoftMedium",
  },
});
