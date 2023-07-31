import {
  ActivityIndicator,
  Image,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore } from "../../store/useAuthStore";
import {
  BoldText,
  HeadingText,
  MediumText,
} from "../../components/styled-text";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import PersonalEvents from "../../components/personal-events";
import { showMessage } from "react-native-flash-message";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

type Props = {
  sortBy: "nearest" | "recent";
};

function TodayBar() {
  const today = dayjs().format("DD MMMM");

  return (
    <View
      style={{
        borderColor: "coral",
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 5,
        marginTop: 8,
        alignItems: "center",
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
        <BoldText style={{ color: "coral" }}>{today}</BoldText>
      </View>
    </View>
  );
}

export default function YouTab({ sortBy }: Props) {
  const user = useAuthStore((state) => state.user);
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<any>([]);
  const [bookmarks, setBookmarks] = useState<any>([]);
  const [friends, setFriends] = useState<any>([]);
  const { navigate } = useNavigation();

  async function fetchEventsByRecent() {
    try {
      const userQuery = query(
        collection(db, "events"),
        where("user_uid", "==", user.uid)
      );
      const userEvents = onSnapshot(userQuery, (snapshot) => {
        const newEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(newEvents);
      });
      setLoading(false);
    } catch (e) {
      showMessage({
        message: "failed to fetch your events!",
        type: "danger",
        icon: "danger",
      });
      setLoading(false);
    }
  }

  async function fetchEventsByUpcoming() {
    try {
      const userQuery = query(
        collection(db, "events"),
        where("user_uid", "==", user.uid),
        orderBy("start_date", "asc")
      );
      const userEvents = onSnapshot(userQuery, (snapshot) => {
        const newEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(newEvents);
      });
      setLoading(false);
    } catch (e) {
      showMessage({
        message: "failed to fetch your events!",
        type: "danger",
        icon: "danger",
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    sortBy === "recent" ? fetchEventsByRecent() : fetchEventsByUpcoming();
  }, [sortBy]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
          <Ionicons name="ios-people" size={25} color={"coral"} />
        </View>

        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <Ionicons name="ios-chatbubbles-outline" size={25} color={"#000"} />
          <Ionicons name="ios-notifications-outline" size={25} color={"#000"} />
          <Ionicons
            onPress={() => navigate("settings")}
            name="ios-settings-outline"
            size={25}
            color={"#000"}
          />
        </View>
      </View>

      {/* user stats */}
      <View
        style={{
          borderBottomColor: "#eee",
          borderBottomWidth: 1,
          paddingHorizontal: 16,
          marginTop: 24,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
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

          <View style={{ alignItems: "center" }}>
            <BoldText>{events.length}</BoldText>
            <MediumText>events</MediumText>
          </View>
          <View style={{ alignItems: "center" }}>
            <BoldText
              style={{ color: bookmarks.length === 0 ? "#d3d3d3" : "black" }}
            >
              {bookmarks.length}
            </BoldText>
            <MediumText>bookmarks</MediumText>
          </View>
          <View style={{ alignItems: "center" }}>
            <BoldText
              style={{ color: friends.length === 0 ? "#d3d3d3" : "black" }}
            >
              {friends.length}
            </BoldText>
            <MediumText>friends</MediumText>
          </View>
        </View>

        <View style={{ marginVertical: 8, width: "50%" }}>
          <BoldText>{user.username}</BoldText>
        </View>
      </View>

      {/* all events */}
      <View style={{ flex: 1, paddingHorizontal: 16, paddingVertical: 8 }}>
        {loading ? (
          <ActivityIndicator color={"coral"} size={30} />
        ) : (
          <FlatList
            data={events}
            renderItem={({ item }) => <PersonalEvents {...item} />}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={
                  sortBy === "recent"
                    ? fetchEventsByRecent
                    : fetchEventsByUpcoming
                }
                colors={["coral"]}
              />
            }
            ListHeaderComponent={() => (
              <>
                <HeadingText>{dayjs().format("YYYY")}</HeadingText>
                <TodayBar />
              </>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  marginTop: 16,
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Image
                  source={require("../../assets/empty.png")}
                  style={{ width: 250, height: 250 }}
                />
              </View>
            )}
            contentContainerStyle={{ paddingBottom: 32 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
