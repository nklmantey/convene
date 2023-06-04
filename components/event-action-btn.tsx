import { TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function EventActionButton({
  name,
  altName,
  onPress,
}: {
  name?: keyof typeof Ionicons.glyphMap;
  altName?: keyof typeof FontAwesome5.glyphMap;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: 40,
        height: 40,
        borderWidth: 1.5,
        borderColor: "coral",
        borderRadius: 8,
        backgroundColor: "rgba(255,127,80, 0.3)",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {altName ? (
        <FontAwesome5 name={altName} size={20} color="coral" />
      ) : (
        <Ionicons name={name} size={20} color="coral" />
      )}
    </TouchableOpacity>
  );
}
