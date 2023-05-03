import { Text, TextProps } from "react-native";

export function BoldText(props: TextProps) {
  return <Text {...props} style={[props.style, { fontFamily: "InterBold" }]} />;
}

export function SemiBoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterSemiBold" }]} />
  );
}

export function RegularText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterRegular" }]} />
  );
}

export function MediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterMedium" }]} />
  );
}
