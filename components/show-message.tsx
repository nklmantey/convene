import { showMessage } from "react-native-flash-message";
import { Ionicons } from "@expo/vector-icons";

type CustomMessageProps = {
  message: string;
  type: "default" | "danger" | "info" | "none" | "success" | "warning";
  icon:
    | "ios-checkmark-circle-outline"
    | "ios-close-circle-outline"
    | "ios-warning-outline";
};
export default function ShowMessage({
  message,
  type,
  icon,
}: CustomMessageProps) {
  return showMessage({
    message: message,
    type: type,
    icon: (props: any) => (
      <Ionicons name={icon} color="white" size={20} {...props} />
    ),
    titleStyle: {
      fontFamily: "InterMedium",
      fontSize: 16,
    },
  });
}
