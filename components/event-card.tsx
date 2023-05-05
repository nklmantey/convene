import { View, Image, TouchableOpacity } from "react-native";
import { BoldText, MediumText } from "./styled-text";
import { Ionicons } from "@expo/vector-icons";
import ETA from "./eta-card";

export default function EventCard({
  avatar,
  username,
  image,
  title,
  content,
  datePosted,
  eta,
}: EventType) {
  return (
    <View
      style={{
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
        padding: 8,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Image
          source={avatar}
          style={{ width: 50, height: 50, borderRadius: 25 }}
          resizeMode="cover"
        />
        <View style={{ gap: 8, flex: 1 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <BoldText>{username}</BoldText>
            <TouchableOpacity>
              <Ionicons
                name="ios-ellipsis-horizontal"
                size={20}
                color={"#000"}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: image }}
            style={{ width: "100%", height: 200, borderRadius: 16 }}
            resizeMode="cover"
          />
          <BoldText>{title}</BoldText>
          <ETA eta={eta} />
          <MediumText>{content}</MediumText>
          <View
            style={{
              flexDirection: "row",
              marginTop: 16,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <TouchableOpacity>
              <Ionicons
                name="ios-chatbubble-outline"
                size={20}
                color={"#000"}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ios-heart-outline" size={22} color={"#000"} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Ionicons name="ios-bookmark-outline" size={20} color={"#000"} />
            </TouchableOpacity>
            <MediumText>{datePosted.toString().slice(4, 15)}</MediumText>
          </View>
        </View>
      </View>
    </View>
  );
}
