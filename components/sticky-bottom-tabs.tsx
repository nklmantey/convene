import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BoldText, MediumText } from "./styled-text";
import { useState } from "react";
import YouTab from "../screens/home/you";
import FriendsTab from "../screens/home/friends";
import { useNavigation } from "@react-navigation/native";

export default function StickyBottomTabs() {
  const { navigate }: any = useNavigation();
  const [activeTab, setActiveTab] = useState<"you" | "friends">("you");

  return (
    <View style={{ flex: 1, paddingVertical: 24 }}>
      <TabNavigation activeTab={activeTab} />
      <View
        style={{
          position: "absolute",
          bottom: 24,
          width: "100%",
          alignSelf: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          paddingHorizontal: 8,
        }}
      >
        <TouchableOpacity
          style={{
            padding: 8,
            backgroundColor: "#eee",
            borderRadius: 8,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="ios-calendar-outline" size={20} color={"#000"} />
        </TouchableOpacity>

        <View
          style={{
            backgroundColor: "#eee",
            flexDirection: "row",
            flex: 1,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 8,
            gap: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => setActiveTab("you")}
            style={{
              backgroundColor: activeTab === "you" ? "#fff" : "#eee",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 4,
            }}
          >
            {activeTab === "you" ? (
              <BoldText style={{ fontSize: 12 }}>you</BoldText>
            ) : (
              <MediumText style={{ fontSize: 12 }}>you</MediumText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setActiveTab("friends")}
            style={{
              backgroundColor: activeTab === "friends" ? "#fff" : "#eee",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              padding: 4,
            }}
          >
            {activeTab === "friends" ? (
              <BoldText style={{ fontSize: 12 }}>friends</BoldText>
            ) : (
              <MediumText style={{ fontSize: 12 }}>friends</MediumText>
            )}
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigate("add-event")}
          style={{
            padding: 8,
            backgroundColor: "#eee",
            borderRadius: 8,
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons name="ios-add" size={20} color={"#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TabNavigation({ activeTab }: { activeTab: string }) {
  return (
    <View style={{ flex: 1 }}>
      {activeTab === "you" ? <YouTab /> : <FriendsTab />}
    </View>
  );
}
