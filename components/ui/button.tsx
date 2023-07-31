import { TouchableOpacity, ViewStyle } from "react-native";
import { BoldText } from "../styled-text";

type ButtonProps = {
  title: string | JSX.Element;
  onPress: () => void;
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
        borderRadius: 1000,
      }}
    >
      <BoldText style={{ fontSize: 18, color: "#fff" }}>{title}</BoldText>
    </TouchableOpacity>
  );
}
