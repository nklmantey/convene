import { ScrollView, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Events as events } from "../../constants/events-data";
import EventCard from "../../components/event-card";
import { useAuthStore } from "../../store/useAuthStore";

export default function FriendsTab() {
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

      {/* content scrollview */}
      <ScrollView
        style={{ marginTop: 16, flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 48 }}
      >
        {events.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </ScrollView>
    </View>
  );
}
