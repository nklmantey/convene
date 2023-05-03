import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import { BoldText } from "../../components/styled-text";

function StickyTab() {}

export default function HomeScreen() {
  const { navigate }: any = useNavigation();
  const { screenWidth, screenHeight } = useDimensions();

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 16,
      }}
    >
      <BoldText>hi</BoldText>
    </View>
  );
}
