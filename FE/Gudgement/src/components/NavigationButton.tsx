import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { Text, TouchableOpacity } from "react-native";

function NavigationButton({
  screenName,
  text,
}: {
  screenName: keyof CommonType.RootStackParamList;
  text: string;
}) {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(screenName)}
      className=""
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

export default NavigationButton;
