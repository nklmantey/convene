import { Image, ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/useAuthStore";
import {
  BoldText,
  MediumText,
  SubHeadingText,
} from "../../components/styled-text";
import PersonalEvents from "../../components/personal-events";
import { UserEvents as events } from "../../constants/user-events";
import dayjs from "dayjs";

function TodayBar() {
  const today = dayjs().format("DD/MMM");

  return (
    <View
      style={{
        borderColor: "coral",
        borderWidth: 1,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
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
        <BoldText style={{ color: "coral" }}>TODAY - {today}</BoldText>
      </View>
    </View>
  );
}

export default function YouTab() {
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);

  return (
    <View style={{ flex: 1 }}>
      {/* header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingHorizontal: 16,
        }}
      >
        <View>
          <Ionicons
            name="ios-people-outline"
            size={25}
            color={"coral"}
            onPress={() => setIsLoggedIn(false)}
          />
        </View>

        <View style={{ flexDirection: "row", gap: 16, alignItems: "center" }}>
          <Ionicons name="ios-chatbubbles-outline" size={25} color={"#000"} />
          <Ionicons name="ios-notifications-outline" size={25} color={"#000"} />
          <Ionicons name="ios-menu" size={25} color={"#000"} />
        </View>
      </View>

      {/* user profile */}
      <View
        style={{
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          paddingHorizontal: 16,
          marginTop: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <Image
            source={require("../../assets/avatar.png")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
            resizeMode="cover"
          />

          <View style={{ alignItems: "center" }}>
            <MediumText>Events</MediumText>
            <BoldText>4</BoldText>
          </View>
          <View style={{ alignItems: "center" }}>
            <MediumText>Bookmarks</MediumText>
            <BoldText>2</BoldText>
          </View>
          <View style={{ alignItems: "center" }}>
            <MediumText>Friends</MediumText>
            <BoldText>3</BoldText>
          </View>
        </View>

        <View style={{ marginVertical: 8, width: "50%" }}>
          <BoldText>nklmantey</BoldText>
          <MediumText style={{ fontSize: 12 }}>
            I love going places, travelling
          </MediumText>
        </View>
      </View>

      {/* all events */}
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        <SubHeadingText>2023</SubHeadingText>
        <TodayBar />
        {events.map((event) => (
          <PersonalEvents key={event.id} {...event} />
        ))}
      </ScrollView>
    </View>
  );
}
