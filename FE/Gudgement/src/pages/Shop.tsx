import { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Text as SvgText } from "react-native-svg";
import { CommonType } from "../types/CommonType";
import MyCharacter from "../assets/images/character.png";
import ShopItems from "../components/ShopItems";
import Reactotron from "reactotron-react-native";
import BuyModal from "../components/BuyModal";
import Shoes from "../assets/images/item.svg";
import CompleteModal from "../components/CompleteModal";
import ShopBackground from "../assets/images/shopBackground.png";
import PointHeader from "../components/PointHeader";

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
  const offset = useSharedValue(5);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
  const [category, setCategory] = useState("치장");
  const [modalVisible, setModalVisible] = useState({
    buy: false,
    complete: false,
  });
  const shopBackground: ImageSourcePropType =
    ShopBackground as ImageSourcePropType;

  const categoryStyle = (select: string) => `rounded-[8px] border-2 
  ${category === select ? "border-main" : "border-black"} bg-darkgray50`;
  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 500 }),
      -5,
      true
    );
  }, [offset]);

  const handleBuy = useCallback(() => {
    setModalVisible({ ...modalVisible, buy: !modalVisible.buy });
    Reactotron.log!("구매 완료");
  }, [modalVisible]);
  const handleCategory = useCallback((select: string) => {
    setCategory(select);
  }, []);

  return (
    <SafeAreaView>
      <ImageBackground
        source={shopBackground}
        resizeMode="cover"
        style={{ opacity: 0.7, backgroundColor: "black" }}
        className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
      />
      <PointHeader />
      <ScrollView className="w-full bg-transpraent pt-5">
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
            <Animated.View style={[animatedStyles]}>
              <Image source={myCharacter} />
            </Animated.View>
            <Pressable className="w-fit bg-black50 border-2 border-black rounded-[6px]">
              <Text className="px-3 py-[2px] text-[16px] font-PretendardExtraBold text-white">
                캐릭터 선택
              </Text>
            </Pressable>
          </View>
          <View className="items-center">
            <Svg height="73" width="140">
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
            <Text className="text-white font-PretendardMedium text-[16px]">
              아이템 상세 설명
            </Text>
            <Text className="text-white font-PretendardMedium text-[16px]">
              아이템 상세 설명
            </Text>
            <Text className="text-white font-PretendardMedium text-[16px]">
              아이템 상세 설명
            </Text>
            <Text className="text-white font-PretendardMedium text-[16px]">
              아이템 상세 설명
            </Text>
            <TouchableOpacity
              activeOpacity={0.5}
              className="w-fit bg-buy rounded-[15px] mt-5 border-2 border-[#6f530d]"
              onPress={handleBuy}
            >
              <Text className="px-4 py-[4px] font-PretendardExtraBold text-black text-[20px]">
                구매하기
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="w-full h-16" />
        <View className="ml-5 w-full h-fit flex-row space-x-2">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleCategory("치장");
            }}
            className={categoryStyle("치장")}
          >
            <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
              치장
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              handleCategory("칭호");
            }}
            className={categoryStyle("칭호")}
          >
            <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
              칭호
            </Text>
          </TouchableOpacity>
        </View>
        <View className="w-full h-fit justify-center flex-row flex-wrap mb-[45%] mt-4">
          <ShopItems items={DATA} />
        </View>
      </ScrollView>
      <BuyModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        item={{
          image: Shoes as ImageSourcePropType,
          title: "컨버스화",
          description: "어쩌고 저쩌고",
          price: 100,
        }}
      />
      <CompleteModal
        completeModalVisible={modalVisible}
        setCompleteModalVisible={setModalVisible}
        item={{
          image: Shoes as ImageSourcePropType,
          title: "컨버스화",
          description: "어쩌고 저쩌고",
          price: 100,
        }}
      />
    </SafeAreaView>
  );
}

export default Shop;
