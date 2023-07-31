import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { BoldText, MediumText } from "./styled-text";
import { useCallback, useMemo, useRef, useState } from "react";
import YouTab from "../screens/home/you";
import FriendsTab from "../screens/home/friends";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import BottomSheetAction from "./bottom-sheet-action";

export default function StickyBottomTabs() {
  const { navigate }: NavigationProp<HomeStackParamList> = useNavigation();
  const [activeTab, setActiveTab] = useState<"you" | "friends">("you");
  const [sortBy, setSortBy] = useState<"nearest" | "recent">("recent");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "25%"], []);

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
      <TabNavigation activeTab={activeTab} sortBy={sortBy} />
      <View
        style={{
          position: "absolute",
          bottom: 30,
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
              padding: 6,
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
              padding: 6,
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
            padding: 8,
            gap: 24,
          }}
        >
          <BottomSheetAction
            icon="ios-calendar"
            title="sort by upcoming"
            onPress={() => {
              setSortBy("nearest");
              bottomSheetRef.current?.close();
            }}
            subtext="this sorts the events and shows those with the nearest approaching date first"
          />
          <BottomSheetAction
            icon="ios-time"
            title="sort by recent"
            onPress={() => {
              setSortBy("recent");
              bottomSheetRef.current?.close();
            }}
            subtext="this sorts the events and shows those posted recently first"
          />
        </View>
      </BottomSheet>
    </View>
  );
}

type Props = {
  activeTab: string;
  sortBy: "nearest" | "recent";
};

function TabNavigation({ activeTab, sortBy }: Props) {
  return (
    <View style={{ flex: 1 }}>
      {activeTab === "you" ? <YouTab sortBy={sortBy} /> : <FriendsTab />}
    </View>
  );
}
