import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";

import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  ImageSourcePropType,
} from "react-native";
import MyCharacter from "../assets/images/character.png";
import Svg, { Text as SvgText } from "react-native-svg";
import ShopItems from "../components/ShopItems";

const DATA = Array.from({ length: 20 }, (_, idx) => {
  return {
    id: idx,
    title: `${idx}번째 아이템`,
    image: `${idx}번째 이미지`,
  };
});

function Shop() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const myCharacter: ImageSourcePropType = MyCharacter as ImageSourcePropType;

  return (
    <SafeAreaView>
      <ScrollView className="w-full bg-sub01 pt-5">
        <View className="w-full h-12 justify-around space-x-36 flex flex-row top-2">
          <View className="bg-white border-2 border-black w-28 h-8 flex justify-center items-center rounded-[4px]">
            <View className="bg-black w-[96%] h-[88%] rounded-[4px]">
              <Text className="text-center ml-8 font-PretendardExtraBold text-white text-[16px] whitespace-nowrap">
                상점
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-main h-8 rounded-[4px] border-2 border-[rgba(19, 19, 26, 0.50)]"
            onPress={() => navigation.navigate("Inventory")}
          >
            <Text className="p-1 font-PretendardExtraBold text-darkgray text-[16px]">
              인벤토리 보기
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className="absolute w-12 h-12
       left-2 rounded-full bg-white border-2 border-black justify-center items-center"
        >
          <View className="rounded-full  h-10 z-10 flex bg-darkgray" />
        </View>
        <View className="w-full h-60  flex flex-row justify-center space-x-24 mt-12">
          <View className="w-1/4 h-fit items-center ">
            <Image source={myCharacter} />
            <Pressable className="w-fit bg-sub01 border-2 border-black rounded-[4px]">
              <Text className="px-2 py-[2px] font-PretendardExtraBold text-white">
                캐릭터 선택
              </Text>
            </Pressable>
          </View>
          <View className="items-center">
            <Svg height="80" width="140">
              <SvgText
                fill="white"
                stroke="black"
                fontSize="24"
                fontFamily="Pretendard-ExtraBold"
                x="70"
                y="20"
                textAnchor="middle"
              >
                컨버스화
              </SvgText>
              <SvgText
                fill="#ffb800"
                x="70"
                y="50"
                fontSize="20"
                stroke="black"
                fontFamily="Pretendard-ExtraBold"
                textAnchor="middle"
              >
                100티끌
              </SvgText>
            </Svg>
            <Text className="text-white font-PretendardMedium">
              아이템 상세 설명
            </Text>
            <Text className="text-white font-PretendardMedium">
              아이템 상세 설명
            </Text>
            <Text className="text-white font-PretendardMedium">
              아이템 상세 설명
            </Text>
            <Text className="text-white font-PretendardMedium">
              아이템 상세 설명
            </Text>
            <Pressable className="w-fit bg-buy rounded-[8px] mt-7">
              <Text className="px-4 py-[4px] font-PretendardExtraBold text-black">
                구매하기
              </Text>
            </Pressable>
          </View>
        </View>
        <View className="w-full h-16" />
        <View className="ml-5 w-full h-fit flex-row space-x-2">
          <Pressable className="rounded-[8px] border-2 border-black bg-darkgray50">
            <Text className="text-white px-2 font-PretendardMedium text-[18px]">
              치장
            </Text>
          </Pressable>
          <Pressable className="rounded-[8px] border-2 border-black bg-darkgray50">
            <Text className="text-white px-2 font-PretendardMedium text-[18px]">
              칭호
            </Text>
          </Pressable>
        </View>
        <View className="w-full h-fit justify-center flex-row flex-wrap mb-10 mt-4">
          <ShopItems items={DATA} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Shop;
