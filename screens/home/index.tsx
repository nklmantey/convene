import { useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import useDimensions from "../../hooks/useDimensions";
import { useState } from "react";
import StickyBottomTabs from "../../components/sticky-bottom-tabs";

export default function HomeScreen() {
  const { screenWidth, screenHeight } = useDimensions();

  return (
    <View
      style={{
        width: screenWidth,
        height: screenHeight,
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StickyBottomTabs />
    </View>
  );
}
