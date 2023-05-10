import { Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BoldText,
  MediumText,
  SemiBoldText,
} from "../../components/styled-text";
import { BorderlessInput } from "../../components/ui/input";
import EventActionButton from "../../components/event-action-btn";
import { useCallback, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import BottomSheetAction from "../../components/bottom-sheet-action";

export default function AddEventScreen() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [visibility, setVisibility] = useState<"public" | "invitees only">(
    "public"
  );
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["5%", "35%"], []);

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
            flexDirection: "row",
            gap: 8,
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../assets/avatar.png")}
            style={{ width: 60, height: 60, borderRadius: 30 }}
            resizeMode="cover"
          />
          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.snapToIndex(1);
            }}
            style={{
              borderColor: "coral",
              borderWidth: 1,
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 8,
              backgroundColor: "rgba(255,127,80, 0.3)",
            }}
          >
            <SemiBoldText style={{ color: "coral" }}>{visibility}</SemiBoldText>
          </TouchableOpacity>
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
            placeholder="what's happening?"
            onChangeText={(e) => setTitle(e)}
            maxLength={50}
            value={title}
          />

          <View style={{ gap: 8 }}>
            <View
              style={{ flexDirection: "row", gap: 8, alignItems: "flex-start" }}
            >
              <Ionicons name="ios-time-outline" size={20} color={"gray"} />
              <View style={{ gap: 8 }}>
                <MediumText style={{ color: "gray", fontSize: 16 }}>
                  Start:
                </MediumText>
                <MediumText style={{ color: "gray", fontSize: 16 }}>
                  End:
                </MediumText>
              </View>
            </View>
          </View>

          {/* location and icon should show here after a user selects a location from the action button */}
          {location && <BoldText>{location}</BoldText>}

          <BorderlessInput
            placeholder="describe your event"
            onChangeText={(e) => setDescription(e)}
            multiline={true}
            value={description}
          />
        </View>
      </View>

      {/* bottom action bar */}
      <View
        style={{
          borderTopWidth: 1,
          borderTopColor: "#eee",
          padding: 24,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <EventActionButton onPress={() => {}} name="ios-location" />
        <EventActionButton onPress={() => {}} name="ios-people" />
        <EventActionButton onPress={() => {}} altName="unsplash" />
        <EventActionButton onPress={() => {}} name="ios-images" />
        <EventActionButton onPress={() => {}} name="ios-pricetag" />
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
            // alignItems: "center",
            gap: 8,
          }}
        >
          <BottomSheetAction
            icon="ios-eye"
            title="public"
            onPress={() => {
              setVisibility("public");
              bottomSheetRef.current?.close();
            }}
            subtext="this event will be visible to all your friends on convene"
          />
          <BottomSheetAction
            icon="ios-mail-open"
            title="invitees only"
            onPress={() => {
              setVisibility("invitees only");
              bottomSheetRef.current?.close();
            }}
            subtext="this event will be visible to only friends you've invited"
          />
        </View>
      </BottomSheet>
    </View>
  );
}
