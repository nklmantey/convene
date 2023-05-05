import { Image, View } from "react-native";
import { MediumText, RegularText } from "./styled-text";
import ETA from "./eta-card";

export default function PersonalEvents({
  id,
  image,
  title,
  datePosted,
  eta,
}: any) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 2,
            height: 30,
            backgroundColor: "#eee",
          }}
        />
        <Image
          source={{ uri: image }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
          resizeMode="cover"
        />
        <View
          style={{
            width: 2,
            height: 30,
            backgroundColor: "#eee",
          }}
        />
      </View>
      <View style={{ marginBottom: 8, gap: 8 }}>
        <MediumText>{title}</MediumText>
        <ETA eta={eta} />
      </View>
    </View>
  );
}
