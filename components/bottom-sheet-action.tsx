import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BoldText } from "./styled-text";

type BottomSheetActionProps = {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtext: string;
};
export default function BottomSheetAction({
  onPress,
  icon,
  title,
  subtext,
}: BottomSheetActionProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: 8,
        paddingHorizontal: 16,
        alignSelf: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          height: 40,
          width: 40,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 20,
          backgroundColor: "rgba(255,127,80, 0.8)",
        }}
      >
        <Ionicons name={icon} size={20} color={"#fff"} />
      </View>
      <View style={{ gap: 2, backgroundColor: "#fff", maxWidth: "90%" }}>
        <BoldText style={{ fontSize: 18, color: "coral" }}>{title}</BoldText>
        <BoldText style={{ fontSize: 12, color: "gray" }} numberOfLines={3}>
          {subtext}
        </BoldText>
      </View>
    </TouchableOpacity>
  );
}
