import {
  ActivityIndicator,
  Image,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";
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
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuthStore } from "../../store/useAuthStore";
import * as ImagePicker from "expo-image-picker";
import dayjs from "dayjs";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { getAuth } from "firebase/auth";
import { PrimaryButton } from "../../components/ui/button";

export default function AddEventScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [mode, setMode] = useState<"date" | "time">("date");
  const [show, setShow] = useState(false);
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [visibility, setVisibility] = useState<"public" | "invitees only">(
    "public"
  );
  const user = useAuthStore((state) => state.user);
  const { params }: any = useRoute();

  useEffect(() => {
    params && setImage(params.unsplashImage);
  }, [params]);

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
    setShow(false);
    setStartDate(currentDate);
  };

  const showMode = (currentMode: any) => {
    if (Platform.OS === "android" || Platform.OS === "ios") {
      setShow(true);
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
  async function handleCreateEvent() {
    setLoading(true);
    try {
      await addDoc(collection(db, "events"), {
        visibility: visibility,
        start_date: dayjs(startDate).format("DD MMMM YYYY"),
        start_time: dayjs(startDate).format("HH:mm"),
        event_title: title,
        event_image: image,
        event_description: description,
        event_location: "Accra, Ghana",
        user_uid: user.uid,
      });
      setLoading(false),
        showMessage({
          message: "event successfully created!",
          type: "success",
          icon: "success",
        });
      navigation.navigate("home");
    } catch (e) {
      console.log(e);

      showMessage({
        message: "failed to create event!",
        type: "danger",
        icon: "danger",
      });
      setLoading(false);
    }
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
          {user.avatar ? (
            <Image
              source={{ uri: user.avatar }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
              resizeMode="cover"
            />
          ) : (
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                borderWidth: 1,
                borderColor: "#d3d3d3",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Ionicons name="ios-person-outline" size={20} color={"#000"} />
            </TouchableOpacity>
          )}
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
            {show && (
              <DateTimePicker
                testID="startdtpicker"
                value={startDate!}
                mode={mode}
                is24Hour={true}
                onChange={startOnChange}
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

          <PrimaryButton
            title={
              loading ? <ActivityIndicator color={"#fff"} /> : "create event"
            }
            onPress={() => handleCreateEvent()}
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
