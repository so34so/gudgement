import {
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import ShopBackground from "../assets/images/shopBackground.png";
import { CommonType } from "../types/CommonType";

function ShopEntrance() {
  const shopBackground: ImageSourcePropType =
    ShopBackground as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  return (
    <View className="flex flex-1 w-full h-full">
      <ImageBackground
        source={shopBackground}
        resizeMode="cover"
        className="flex-1"
      >
        <Pressable
          className="absolute bg-pink-500 top-1/3 left-[20%] rounded-[20px]"
          onPress={() => navigation.navigate("Shop")}
        >
          <Text className=" font-PretendardBold text-[16px] p-5 text-black">
            치장
          </Text>
        </Pressable>
        <Pressable
          className="absolute bg-blue-500 top-1/3 right-[20%] rounded-[20px]"
          onPress={() => navigation.navigate("Shop")}
        >
          <Text className=" font-PretendardBold text-[16px] p-5 text-black">
            캐릭터
          </Text>
        </Pressable>
      </ImageBackground>
    </View>
  );
}

export default ShopEntrance;
