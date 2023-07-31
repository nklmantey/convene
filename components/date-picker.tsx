import React, { useState } from "react";
import { TouchableOpacity, Platform, View } from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import { RegularText } from "./styled-text";

type CustomDatePickerProps = {
  date: Date | undefined;
  exitOnClose: (currentDate: Date) => void;
  onDateSelected: () => void;
  mode: "date" | "time";
};

const CustomDatePicker = ({
  date,
  exitOnClose,
  onDateSelected,
  mode,
}: CustomDatePickerProps) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [internalDate, setInternalDate] = useState(date || new Date());
  const [internalTime, setInternalTime] = useState(date || new Date());

  const onChange = (
    event: DateTimePickerEvent,
    selectedDate: Date | undefined
  ) => {
    const currentDate = selectedDate || date || new Date();
    setInternalDate(currentDate);
    exitOnClose(currentDate);
  };

  return (
    <View style={{ justifyContent: "center" }}>
      {Platform.OS === "ios" && mode === "date" && (
        <Modal isVisible={modalVisible} backdropOpacity={0.3}>
          <View style={{ borderRadius: 12, backgroundColor: "#ffffff" }}>
            <View
              style={{
                width: "100%",
                padding: 16,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                borderBottomWidth: 1,
                borderColor: "#e3e3e3",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  exitOnClose(internalDate);
                }}
              >
                <RegularText onPress={onDateSelected}>Done</RegularText>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
              <DateTimePicker
                value={internalDate}
                mode={"date"}
                textColor="grey"
                display="spinner"
                onChange={onChange}
                style={{ backgroundColor: "#ffffff", borderRadius: 12 }}
              />
            </View>
          </View>
        </Modal>
      )}
      {Platform.OS === "android" && mode === "date" && (
        <DateTimePicker
          value={internalDate}
          mode={"date"}
          display="default"
          onChange={onChange}
          style={{ backgroundColor: "#ffffff", borderRadius: 12 }}
        />
      )}
      {Platform.OS === "ios" && mode === "time" && (
        <Modal isVisible={modalVisible} backdropOpacity={0.3}>
          <View style={{ borderRadius: 12, backgroundColor: "#ffffff" }}>
            <View
              style={{
                width: "100%",
                padding: 16,
                justifyContent: "flex-end",
                alignItems: "flex-end",
                borderBottomWidth: 1,
                borderColor: "#e3e3e3",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                  exitOnClose(internalDate);
                }}
              >
                <RegularText onPress={onDateSelected}>Done</RegularText>
              </TouchableOpacity>
            </View>
            <View style={{ padding: 20 }}>
              <DateTimePicker
                value={internalDate}
                mode={"time"}
                textColor="grey"
                display="spinner"
                onChange={onChange}
                style={{ backgroundColor: "#ffffff", borderRadius: 12 }}
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

export default CustomDatePicker;
