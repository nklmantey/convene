import { Image, View } from "react-native";
import { MediumText, RegularText } from "./styled-text";
import ETA from "./eta-card";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function PersonalEvents({
  event_title,
  event_image,
  start_date,
}: any) {
  const [eta, setEta] = useState("");

  useEffect(() => {
    function findEta() {
      var relativeTime = require("dayjs/plugin/relativeTime");
      dayjs.extend(relativeTime);
      var customParseFormat = require("dayjs/plugin/customParseFormat");
      dayjs.extend(customParseFormat);
      var isToday = require("dayjs/plugin/isToday");
      dayjs.extend(isToday);

      const startDateObj = dayjs(start_date, "DD MMM YYYY");

      const eta = dayjs().to(dayjs(startDateObj)); // in 31 years

      eta.includes("ago") ? setEta("today") : setEta(eta);
    }

    findEta();
  }, [eta]);

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 8,
      }}
    >
      <View style={{ alignItems: "center" }}>
        <View
          style={{
            width: 2,
            height: 30,
            backgroundColor: "#eee",
          }}
        />
        <Image
          source={{ uri: event_image }}
          style={{ width: 80, height: 80, borderRadius: 40 }}
          resizeMode="cover"
        />
        <View
          style={{
            width: 2,
            height: 30,
            backgroundColor: "#eee",
          }}
        />
      </View>
      <View style={{ marginBottom: 8, gap: 8 }}>
        <MediumText>{event_title}</MediumText>
        <ETA eta={eta} />
      </View>
    </View>
  );
}
