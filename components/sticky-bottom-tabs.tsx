import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BoldText, MediumText } from "./styled-text";
import { useCallback, useMemo, useRef, useState } from "react";
import YouTab from "../screens/home/you";
import FriendsTab from "../screens/home/friends";
import { useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";

export default function StickyBottomTabs() {
  const { navigate }: any = useNavigation();
  const [activeTab, setActiveTab] = useState<"you" | "friends">("you");
  const [sortBy, setSortBy] = useState<"nearest" | "recent">("nearest");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "30%"], []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.4}
        enableTouchThrough={false}
        disappearsOnIndex={-1}
        pressBehavior="close"
      />
    ),
    []
  );

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
          onPress={() => {
            bottomSheetRef.current?.snapToIndex(1);
          }}
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
          <Ionicons
            name={
              sortBy === "nearest" ? "ios-calendar-outline" : "ios-time-outline"
            }
            size={20}
            color={"#000"}
          />
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

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            alignItems: "center",
            gap: 24,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              setSortBy("nearest");
              bottomSheetRef.current?.close();
            }}
            style={{
              flexDirection: "row",
              gap: 16,
              paddingHorizontal: 24,
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "flex-start",
              borderRadius: 6,
              width: "100%",
            }}
          >
            <Ionicons name="ios-calendar-outline" size={30} color={"gray"} />
            <BoldText style={{ fontSize: 18, color: "gray" }}>
              sort by nearest date
            </BoldText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSortBy("recent");
              bottomSheetRef.current?.close();
            }}
            style={{
              flexDirection: "row",
              gap: 16,
              paddingHorizontal: 24,
              paddingVertical: 8,
              alignItems: "center",
              justifyContent: "flex-start",
              borderRadius: 6,
              width: "100%",
            }}
          >
            <Ionicons name="ios-time-outline" size={30} color={"gray"} />
            <BoldText style={{ fontSize: 18, color: "gray" }}>
              sort by recently posted
            </BoldText>
          </TouchableOpacity>
        </View>
      </BottomSheet>
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
