import { Image, Platform, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  BoldText,
  MediumText,
  SemiBoldText,
} from "../../components/styled-text";
import { BorderlessInput } from "../../components/ui/input";
import EventActionButton from "../../components/event-action-btn";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import BottomSheetAction from "../../components/bottom-sheet-action";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthStore } from "../../store/useAuthStore";
import * as ImagePicker from "expo-image-picker";
import dayjs from "dayjs";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AddEventScreen({ navigation }: any) {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 16,
            borderRadius: 8,
            backgroundColor: "#fff",
            alignItems: "center",
            justifyContent: "center",
            padding: 4,
          }}
          onPress={() => alert("hi")}
        >
          <BoldText style={{ color: "coral", fontSize: 16 }}>create</BoldText>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [showStartDate, setShowStartDate] = useState(false);
  const [showEndDate, setShowEndDate] = useState(false);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [visibility, setVisibility] = useState<"public" | "invitees only">(
    "public"
  );
  const user = useAuthStore((state) => state.user);

  // bottom sheet config
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

  // date and time picker config
  const startOnChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowStartDate(false);
    setStartDate(currentDate);
  };

  const endOnChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate;
    setShowEndDate(false);
    setEndDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      setShowStartDate(true);
      setShowEndDate(true);
    }
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  // image picker function
  async function selectImageFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  // add event to firestore database
  function handleCreateEvent() {
    console.log(
      dayjs(startDate).format("DD MMMM YYYY"),
      dayjs(startDate).format("HH:mm")
    );
  }

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
            source={{ uri: user.avatar }}
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

          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Ionicons name="ios-calendar-outline" size={20} color={"gray"} />
              <TouchableOpacity onPress={() => showDatepicker()}>
                <MediumText style={{ color: "gray", fontSize: 16 }}>
                  select start date: {dayjs(startDate).format("DD MMMM YYYY")}
                </MediumText>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Ionicons name="ios-time-outline" size={23} color={"gray"} />
              <TouchableOpacity onPress={() => showTimepicker()}>
                <MediumText style={{ color: "gray", fontSize: 16 }}>
                  select start time: {dayjs(startDate).format("HH:mm")}
                </MediumText>
              </TouchableOpacity>
            </View>
            {showStartDate && (
              <DateTimePicker
                testID="startdtpicker"
                value={startDate!}
                mode={mode}
                is24Hour={true}
                onChange={startOnChange}
              />
            )}
          </View>

          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Ionicons name="ios-calendar-outline" size={20} color={"gray"} />
              <TouchableOpacity onPress={() => showDatepicker()}>
                <MediumText style={{ color: "gray", fontSize: 16 }}>
                  select end date: {dayjs(endDate).format("DD MMMM YYYY")}
                </MediumText>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Ionicons name="ios-time-outline" size={23} color={"gray"} />
              <TouchableOpacity onPress={() => showTimepicker()}>
                <MediumText style={{ color: "gray", fontSize: 16 }}>
                  select end time: {dayjs(endDate).format("HH:mm")}
                </MediumText>
              </TouchableOpacity>
            </View>
            {showEndDate && (
              <DateTimePicker
                testID="enddtpicker"
                value={endDate!}
                mode={mode}
                is24Hour={true}
                onChange={endOnChange}
              />
            )}
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: "100%", height: 200, borderRadius: 16 }}
              resizeMode="cover"
            />
          )}

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
        <EventActionButton
          onPress={() => navigation.navigate("unsplash")}
          altName="unsplash"
        />
        <EventActionButton
          onPress={() => selectImageFromGallery()}
          name="ios-image"
        />
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
