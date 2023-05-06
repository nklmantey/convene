import { StyleSheet, TouchableOpacity, ViewStyle } from "react-native";
import { BoldText } from "../styled-text";

type ButtonProps = {
  title: string;
  onPress(): void;
  style?: ViewStyle;
};

export function PrimaryButton({ title, onPress, style }: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...style,
        backgroundColor: "coral",
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
      }}
    >
      <BoldText style={{ fontSize: 16, color: "#fff" }}>{title}</BoldText>
    </TouchableOpacity>
  );
}
