import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
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
import { useRoute } from "@react-navigation/native";
import { showMessage } from "react-native-flash-message";
import { PrimaryButton } from "../../components/ui/button";
import CustomDatePicker from "../../components/date-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function AddEventScreen({ navigation }: any) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [timePickerOpen, setTimePickerOpen] = useState(false);
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

  // create event id
  function generateRandomString(length: number) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  const eventId = generateRandomString(20);

  // add event to firestore database
  async function handleCreateEvent() {
    setLoading(true);
    try {
      await addDoc(collection(db, "events"), {
        visibility: visibility,
        start_date: dayjs(startDate).format("DD MMMM YYYY"),
        start_time: dayjs(startTime).format("HH:mm"),
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
        paddingBottom: 16,
      }}
    >
      {/* header */}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 8 }}
      >
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
            autoFocus={true}
          />

          <View style={{ gap: 16 }}>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Ionicons name="ios-calendar-outline" size={20} color={"gray"} />
              <TouchableOpacity onPress={() => setDatePickerOpen(true)}>
                <MediumText style={{ color: "gray", fontSize: 16 }}>
                  {startDate === undefined && "press to select a start date"}
                  {startDate !== undefined &&
                    `your start date - ${dayjs(startDate).format(
                      "DD MMMM, YYYY"
                    )}`}
                </MediumText>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: "row", gap: 8 }}>
              <Ionicons name="ios-time-outline" size={23} color={"gray"} />
              <TouchableOpacity onPress={() => setTimePickerOpen(true)}>
                <MediumText style={{ color: "gray", fontSize: 16 }}>
                  {startTime === undefined && "press to select a start time"}
                  {startTime !== undefined &&
                    `your start time - ${dayjs(startTime).format("HH:mm A")}`}
                </MediumText>
              </TouchableOpacity>
            </View>

            {datePickerOpen && (
              <CustomDatePicker
                date={startDate}
                exitOnClose={(date) => setStartDate(date)}
                onDateSelected={() => setDatePickerOpen(false)}
                mode={"date"}
              />
            )}

            {timePickerOpen && (
              <CustomDatePicker
                date={startTime}
                exitOnClose={(time) => setStartTime(time)}
                onDateSelected={() => setTimePickerOpen(false)}
                mode={"time"}
              />
            )}
          </View>

          {image && (
            <Image
              source={{ uri: image }}
              style={{
                width: "100%",
                height: undefined,
                aspectRatio: 3 / 2,
                borderRadius: 16,
              }}
              resizeMode="cover"
            />
          )}

          <BorderlessInput
            placeholder="describe your event"
            onChangeText={(e) => setDescription(e)}
            value={description}
            multiline={true}
            autoFocus={false}
          />

          <PrimaryButton
            title={
              loading ? <ActivityIndicator color={"#fff"} /> : "create event"
            }
            onPress={handleCreateEvent}
          />
        </View>
      </KeyboardAwareScrollView>

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
        <EventActionButton onPress={selectImageFromGallery} name="ios-image" />
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
            padding: 8,
            gap: 24,
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
