import { View, Image, TouchableOpacity } from "react-native";
import { BoldText, MediumText } from "./styled-text";
import { Ionicons } from "@expo/vector-icons";

function ETA({ eta }: { eta: string }) {
  return (
    <View
      style={{
        borderColor: "coral",
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        backgroundColor: "rgba(255,127,80, 0.3)",
        alignSelf: "flex-start",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 8,
          alignItems: "center",
        }}
      >
        <Ionicons name="ios-alarm-outline" size={20} color={"coral"} />
        <BoldText style={{ color: "coral" }}>{eta}</BoldText>
      </View>
    </View>
  );
}

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
