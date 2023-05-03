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

export function HeadingText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "InterBold", fontSize: 24 }]}
    />
  );
}

export function SubHeadingText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: "InterMedium", fontSize: 16, color: "gray" },
      ]}
    />
  );
}
