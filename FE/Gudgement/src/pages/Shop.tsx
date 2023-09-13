import { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
  // ImageBackground,
  ImageSourcePropType,
  SafeAreaView,
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
import Reactotron from "reactotron-react-native";
import BuyModal from "../components/BuyModal";
import Shoes from "../assets/images/item.svg";
import CompleteModal from "../components/CompleteModal";
import PointHeader from "../components/PointHeader";
import ShopCarousel from "../components/ShopCarousel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

const screenWidth = Math.round(Dimensions.get("window").width);

const DATA: Array<IShopItem> = Array.from({ length: 6 }, (_, idx) => {
  return {
    id: idx,
    title: `${idx}번째 아이템`,
    image: `${idx}번째 이미지`,
    price: idx * 100 + 1000,
    description:
      "Quis minim deserunt veniam anim dolore minim Lorem magna ad et incididunt consequat eiusmod.",
  };
});
type IShopItem = {
  id: number;
  title: string;
  image: string;
  price: number;
  description: string;
};
type ShopProps = NativeStackScreenProps<CommonType.RootStackParamList, "Shop">;
function Shop({ route }: ShopProps) {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const myCharacter: ImageSourcePropType = MyCharacter as ImageSourcePropType;
  const offset = useSharedValue(5);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
  const [modalVisible, setModalVisible] = useState({
    buy: false,
    complete: false,
  });

  const categoryStyle = () =>
    "rounded-[8px] border-2 border-deepgreen bg-darkgray50";

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 500 }),
      -5,
      true,
    );
  }, [offset]);

  const handleBuy = useCallback(() => {
    setModalVisible({ ...modalVisible, buy: !modalVisible.buy });
    Reactotron.log!("구매 완료");
  }, [modalVisible]);

  const [selectItem, setSelectItem] = useState(0);
  const selectCategory = route.params.category;

  return (
    <SafeAreaView className="bg-sky w-full h-full">
      <View className="w-full h-fit bg-deepgreen">
        <PointHeader />
        <View className="w-full h-12 justify-around space-x-36 flex flex-row top-2">
          <View className="bg-white border-2 border-black w-28 h-8 flex justify-center items-center rounded-[4px]">
            <View className="bg-black w-[96%] h-[88%] rounded-[4px]">
              <Text className="text-center ml-8 font-PretendardExtraBold text-white text-[16px] whitespace-nowrap">
                상점
              </Text>
            </View>
          </View>
          <TouchableOpacity
            className="bg-green h-8 rounded-[4px] border-2 border-darkgray50"
            onPress={() => navigation.navigate("Inventory")}
          >
            <Text className="p-1 font-PretendardExtraBold text-darkgray text-[16px]">
              인벤토리 보기
            </Text>
          </TouchableOpacity>
        </View>
        <View
          className="absolute top-[70px] w-12 h-12
       left-2 rounded-full bg-white border-2 border-black justify-center items-center"
        >
          <View className="absolute top-[70px] rounded-full h-10 z-10 flex bg-darkgray" />
        </View>
        {selectCategory !== "칭호" ? (
          <View className="w-full h-60 flex flex-row justify-center space-x-24 mt-8">
            <View className="w-1/4 h-fit items-center ">
              <Animated.View style={[animatedStyles]}>
                <Image source={myCharacter} />
              </Animated.View>
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
                  {DATA[selectItem].title}
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
                  {`${DATA[selectItem].price} 티끌`}
                </SvgText>
              </Svg>
              <Text
                numberOfLines={4}
                ellipsizeMode="tail"
                className="text-white font-PretendardMedium text-[16px] w-28"
              >
                {DATA[selectItem].description}
              </Text>
              <TouchableOpacity
                activeOpacity={0.5}
                style={{
                  elevation: 8,
                }}
                className="w-fit bg-red rounded-[10px] mt-5 border-2 border-[#6f530d]"
                onPress={handleBuy}
              >
                <Text className="px-4 py-[5px] font-PretendardExtraBold text-white text-[20px]">
                  구매
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View className="w-full h-60 flex flex-col top-6 items-center space-y-12 mt-8">
            <View
              className="w-fit h-[37px] items-center flex-row justify-center space-x-1 bg-white border-2 border-black rounded-[6px] px-[2px] pr-1"
              style={{
                elevation: 10,
              }}
            >
              <Text className="font-PretendardExtraBold text-white bg-black py-1 px-2 rounded-[6px] text-[16px]">
                인동파 행동대장
              </Text>
              <Text className="font-PretendardExtraBold text-black text-[16px]">
                옥계공주
              </Text>
            </View>
            <View>
              <Text className=" font-PretendardBlack text-white text-[20px]">
                칭호 어떻게 얻을 수 있는지 적어라
              </Text>
            </View>
          </View>
        )}
        <View className="w-full h-4" />
      </View>
      <View className="mt-10">
        <View className="ml-5 w-full h-fit flex-row space-x-2">
          <TouchableOpacity
            activeOpacity={0.8}
            className={categoryStyle()}
            disabled
          >
            <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
              {selectCategory}
            </Text>
          </TouchableOpacity>
        </View>
        <ShopCarousel
          gap={16}
          offset={30}
          items={DATA}
          pageWidth={screenWidth - (16 + 30) * 2}
          setSelectItem={setSelectItem}
        />
        {/* <ShopItems items={DATA} /> */}
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
      </View>
    </SafeAreaView>
  );
}

export default Shop;
