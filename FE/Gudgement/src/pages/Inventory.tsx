import { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  Dimensions,
  Image,
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
import { WithLocalSvg } from "react-native-svg";
import { CommonType } from "../types/CommonType";
import MyCharacter from "../assets/images/character.png";
import Reactotron from "reactotron-react-native";
import Carousel from "../components/Carousel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import CloseIcon from "../assets/icons/closeModal.svg";

const screenWidth = Math.round(Dimensions.get("window").width);

const DATA: Array<CommonType.Titem> = Array.from({ length: 6 }, (_, idx) => {
  return {
    id: idx,
    title: `${idx}번째 아이템`,
    image: `${idx}번째 이미지`,
    price: idx * 100 + 1000,
    description:
      "Quis minim deserunt veniam anim dolore minim Lorem magna ad et incididunt consequat eiusmod.",
  };
});

type InventoryProps = NativeStackScreenProps<
  CommonType.RootStackParamList,
  "Inventory"
>;

function Inventory({ route }: InventoryProps) {
  const closeInventory: ImageSourcePropType = CloseIcon as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const myCharacter: ImageSourcePropType = MyCharacter as ImageSourcePropType;
  const offset = useSharedValue(5);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const categoryStyle = () =>
    "rounded-[8px] border-2 border-deepgreen bg-darkgray50";

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 500 }),
      -5,
      true,
    );
  }, [offset]);

  const [selectItem, setSelectItem] = useState(0);
  const [selectCategory, setSelectCategory] = useState(route.params.category);
  return (
    <SafeAreaView className="bg-deepgreen w-full h-full">
      <View className="w-full h-fit bg-green items-center">
        <View className="w-full h-12 justify-around items-center space-x-44 flex flex-row top-4 left-2">
          <View className="bg-white border-2 border-black w-28 h-8 flex justify-center items-center rounded-[4px]">
            <View className="bg-black w-[96%] h-[88%] rounded-[4px]">
              <Text className="text-center ml-8 font-PretendardExtraBold text-white text-[16px] whitespace-nowrap">
                인벤토리
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <WithLocalSvg width={42} height={42} asset={closeInventory} />
          </TouchableOpacity>
        </View>

        <View className="w-full h-[340px] flex flex-col justify-center items-center mt-4">
          {/* <TouchableOpacity
            onPress={() => Reactotron.log!("캐릭터 선택")}
            className="mb-8"
            style={{
              elevation: 8,
            }}
          >
            <Text className="bg-sky font-PretendardBlack text-white border-2 border-darkgray50 px-2 py-1 rounded-[10px]">
              캐릭터 선택
            </Text>
          </TouchableOpacity> */}
          <View className="w-1/4 h-fit items-center mt-5">
            <Animated.View style={[animatedStyles]}>
              <Image source={myCharacter} />
            </Animated.View>
          </View>
          <View
            className="w-fit h-[37px] items-center flex-row justify-center space-x-1 bg-white border-2 border-black rounded-[6px] px-[1px] pr-1"
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
        </View>

        <View className="w-full h-4" />
      </View>
      <View className="mt-10">
        <View className="ml-5 w-full h-fit flex-row space-x-2">
          <TouchableOpacity activeOpacity={0.8} className={categoryStyle()}>
            <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
              캐릭터
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} className={categoryStyle()}>
            <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
              치장
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} className={categoryStyle()}>
            <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
              칭호
            </Text>
          </TouchableOpacity>
        </View>
        <Carousel
          gap={60}
          offset={60}
          items={DATA}
          pageWidth={screenWidth - (65 + 60) * 2}
          setSelectItem={setSelectItem}
          itemWidth={210}
          component="Inventory"
        />
      </View>
    </SafeAreaView>
  );
}

export default Inventory;
