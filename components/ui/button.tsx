import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { BoldText } from "../styled-text";

export function PrimaryButton(props: any) {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        ...props.style,
        backgroundColor: "coral",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }}
    >
      <BoldText style={{ fontSize: 16, color: "#fff" }}>{props.title}</BoldText>
    </TouchableOpacity>
  );
}
