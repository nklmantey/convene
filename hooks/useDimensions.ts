import { Dimensions } from "react-native";

export default function useDimensions() {
  const { width, height } = Dimensions.get("window");
  const screenWidth = width;
  const screenHeight = height;

  return { screenHeight, screenWidth };
}
