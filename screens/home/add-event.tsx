import { Image, View } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { MediumText } from "../../components/styled-text";
import { BorderlessInput } from "../../components/ui/input";
import EventActionButton from "../../components/event-action-btn";

export default function AddEventScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "space-between",
      }}
    >
      {/* header */}
      <View style={{ flex: 1 }}>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 24,
          }}
        >
          <Image
            source={require("../../assets/avatar.png")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
            resizeMode="cover"
          />
        </View>

        <View
          style={{
            marginTop: 8,
            gap: 16,
            paddingHorizontal: 16,
            flex: 1,
          }}
        >
          <BorderlessInput
            placeholder="title"
            onChangeText={() => {}}
            multiline={true}
          />

          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Ionicons name="ios-time-outline" size={20} color={"gray"} />
              <MediumText style={{ color: "gray", fontSize: 16 }}>
                Start:
              </MediumText>
            </View>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "center" }}
            >
              <Ionicons name="ios-time-outline" size={20} color={"gray"} />
              <MediumText style={{ color: "gray", fontSize: 16 }}>
                End:
              </MediumText>
            </View>
          </View>

          <BorderlessInput
            placeholder="message"
            onChangeText={() => {}}
            multiline={true}
          />
        </View>
      </View>

      {/* bottom action bar */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#eee",
          padding: 16,
          flexDirection: "row",
          gap: 16,
        }}
      >
        <EventActionButton onPress={() => {}} name="ios-location" />
        <EventActionButton onPress={() => {}} name="ios-people" />
        <EventActionButton onPress={() => {}} altName="unsplash" />
        <EventActionButton onPress={() => {}} name="ios-images" />
        <EventActionButton onPress={() => {}} name="ios-pricetag" />
      </View>
    </View>
  );
}
