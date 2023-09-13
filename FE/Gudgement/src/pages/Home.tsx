import { NavigationProp, useNavigation } from "@react-navigation/native";
import { View } from "react-native";
import { CommonType } from "../types/CommonType";
export default function Home() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  console.log(navigation);
  return (
    <View className="w-full h-full flex justify-center items-center">
      {/* <TouchableOpacity onPress={
        () => navigation.navigate('MyPage')}
      >
        <Text>이동</Text>
      </TouchableOpacity> */}
    </View>
  );
}
