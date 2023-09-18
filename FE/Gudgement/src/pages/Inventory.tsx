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
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
// import CompleteModal from "../components/CompleteModal";
import { INVENTORY_CATEGORY } from "../utils/common";
import CompleteModal from "../components/CompleteModal";
import Shoes from "../assets/images/item.svg";
import { API_URL } from "@env";

const screenWidth = Math.round(Dimensions.get("window").width);

const DATA: Array<CommonType.Titem> = Array.from({ length: 6 }, (_, idx) => {
  return {
    id: idx,
    itemName: `${idx}번째 아이템`,
    image: `${idx}번째 이미지`,
    price: idx * 100 + 1000,
    itemContent:
      "Quis minim deserunt veniam anim dolore minim Lorem magna ad et incididunt consequat eiusmod.",
    equipped: false,
    sold: false,
    unlocked: false,
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
  const [selectItem, setSelectItem] = useState(0);
  const [selectCategory, setSelectCategory] = useState(route.params.category);
  const [modalVisible, setModalVisible] = useState({ complete: false });

  const categoryStyle = (category: string) =>
    `rounded-[8px] py-[1px] border-2 bg-darkgray50 
    ${category === selectCategory ? "border-main" : "border-darkgray50"}`;

  async function fetchInventoryItem() {
    try {
      const response: CommonType.Titem = await axios.get(
        `${API_URL}/inventory/type`,
        {
          params: {
            type: selectCategory,
            memberId: 0,
          },
        },
      );
      Reactotron.log!("fetchShopItem", response);
      return response;
    } catch (errorResponse) {
      if (axios.isAxiosError(errorResponse)) {
        Reactotron.log!("fetchShopItemError", errorResponse);
      }
    }
  }
  const {
    data: fetchItem,
    error,
    refetch,
  } = useQuery({
    queryKey: ["fetchInventoryItem"],
    queryFn: () => fetchInventoryItem(),
    enabled: false,
  });

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 500 }),
      -5,
      true,
    );
  }, [offset]);

  useEffect(() => {
    // 카테고리가 바뀔 때 마다 다른 아이템을 서버에서 불러와야 함
    Reactotron.log!(selectCategory);
    refetch();
  }, [selectCategory]);

  const handleApply = useCallback(() => {
    Reactotron.log!(DATA[selectItem]);
    setModalVisible({ ...modalVisible, complete: !modalVisible.complete });
  }, [modalVisible, selectItem]);

  // if (error) {
  //   return (
  //     <View>
  //       <Text>error</Text>
  //     </View>
  //   );
  // }
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
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              elevation: 8,
            }}
            className="w-fit bg-buy rounded-[10px] mt-5 border-2 border-[#6f530d]"
            onPress={handleApply}
          >
            <Text className="px-4 py-[5px] font-PretendardExtraBold text-white text-[20px]">
              적용
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-full h-4" />
      </View>
      <View className="mt-10">
        <View className="ml-5 w-full h-fit flex-row space-x-2">
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectCategory("캐릭터")}
            className={categoryStyle("캐릭터")}
          >
            <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
              캐릭터
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectCategory("치장")}
            className={categoryStyle("치장")}
          >
            <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
              치장
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setSelectCategory("칭호")}
            className={categoryStyle("칭호")}
          >
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
          component="Inventory"
        />
        <CompleteModal
          completeModalVisible={modalVisible}
          setCompleteModalVisible={setModalVisible}
          item={{
            image: Shoes as ImageSourcePropType,
            itemName: "컨버스화",
            itemContent: "어쩌고 저쩌고",
            price: 100,
            equipped: false,
            sold: false,
            unlocked: false,
          }}
        />
      </View>
    </SafeAreaView>
  );
}

export default Inventory;
