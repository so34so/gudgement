import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View, Text, Pressable } from "react-native";
import { CommonType } from "../types/CommonType";
function Inventory() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  return (
    <View>
      <Pressable onPress={() => navigation.goBack()}>
        <Text>뒤로가기</Text>
      </Pressable>
      <Text>Inventory</Text>
    </View>
  );
}

export default Inventory;
