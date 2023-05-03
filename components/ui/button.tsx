import { StyleSheet, TouchableOpacity } from "react-native";
import { BoldText } from "../styled-text";
import { Ionicons } from "@expo/vector-icons";

export function PrimaryButton(props: any) {
  return (
    <TouchableOpacity
      {...props}
      style={[styles.primaryButton, { backgroundColor: "#F1F1F1" }]}
    >
      <BoldText
        style={{
          color: "#1146AA",
          fontSize: 16,
        }}
      >
        {props.title}
      </BoldText>
    </TouchableOpacity>
  );
}

export function SecondaryButton(props: any) {
  return (
    <TouchableOpacity
      {...props}
      style={[
        styles.primaryButton,
        {
          borderColor: "gainsboro",
          borderWidth: 2,
          opacity: 0.5,
          flexDirection: "row",
          alignItems: "center",
          columnGap: 15,
        },
      ]}
    >
      <Ionicons name={props.iconName} color="gainsboro" size={16} />
      <BoldText
        style={{
          color: "gainsboro",
          fontSize: 16,
        }}
      >
        {props.title}
      </BoldText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    width: "100%",
    borderRadius: 8,
    alignSelf: "center",
    backgroundColor: "transparent",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
});
