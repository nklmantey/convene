import { Text, TextProps } from "react-native";

export function BoldText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterSoftBold" }]} />
  );
}

export function SemiBoldText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "InterSoftSemiBold" }]}
    />
  );
}

export function RegularText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "InterSoftRegular" }]}
    />
  );
}

export function MediumText(props: TextProps) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "InterSoftMedium" }]} />
  );
}

export function HeadingText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "InterSoftBold", fontSize: 24 }]}
    />
  );
}

export function SubHeadingText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: "InterSoftMedium", fontSize: 16, color: "gray" },
      ]}
    />
  );
}
