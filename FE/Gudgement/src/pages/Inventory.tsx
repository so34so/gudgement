import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
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
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { INVENTORY_CATEGORY } from "../utils/common";
import CompleteModal from "../components/CompleteModal";
import { API_URL } from "@env";
import { queryClient } from "../../queryClient";
import reactotron from "reactotron-react-native";

const screenWidth = Math.round(Dimensions.get("window").width);

type InventoryProps = NativeStackScreenProps<
  CommonType.RootStackParamList,
  "Inventory"
>;
interface IresponseEquipment {
  invenId: number;
}
function Inventory({ route }: InventoryProps) {
  const closeInventory: ImageSourcePropType = CloseIcon as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const myCharacter: ImageSourcePropType = MyCharacter as ImageSourcePropType;
  const offset = useSharedValue(5);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
  const [itemStatus, setItemStatus] = useState(true);

  const [selectItem, setSelectItem] = useState(0);
  const [selectCategory, setSelectCategory] = useState(route.params.category);
  const [modalVisible, setModalVisible] = useState({ complete: false });

  const categoryStyle = (category: string) =>
    `rounded-[8px] py-[1px] border-2 bg-darkgray50 
    ${category === selectCategory ? "border-main" : "border-darkgray50"}`;
  const buttonColor = () => {
    return itemStatus ? "bg-sub02" : "bg-buy";
  };

  async function fetchInventoryItem(category: string) {
    try {
      const response: AxiosResponse<CommonType.TinvenItem[]> = await axios.get(
        `${API_URL}/inventory/type`,
        {
          params: {
            type: INVENTORY_CATEGORY[category],
            memberId: 1,
          },
        },
      );
      Reactotron.log!("fetchInventoryItem", response.data);
      return response.data;
    } catch (errorResponse) {
      if (axios.isAxiosError(errorResponse)) {
        Reactotron.log!("fetchShopItemError", errorResponse);
      }
    }
  }
  const {
    data: fetchItem,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["fetchInventoryItem", selectCategory],
    queryFn: () => fetchInventoryItem(selectCategory),
  });

  useLayoutEffect(() => {
    if (fetchItem?.length) {
      setItemStatus(fetchItem[selectItem].equipped);
    }
  }, [fetchItem, selectItem]);
  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 500 }),
      -5,
      true,
    );
  }, [offset]);

  useEffect(() => {
    refetch();
  }, [refetch, selectCategory]);

  const { mutate: equippedItem } = useMutation({
    mutationFn: (params: IresponseEquipment) =>
      axios.put(`${API_URL}/inventory`, null, {
        params: {
          invenId: params.invenId,
        },
      }),
    onSuccess: () => {
      setModalVisible({ ...modalVisible, complete: !modalVisible.complete });
      queryClient.invalidateQueries(["fetchInventoryItem", selectCategory]);
    },
  });

  const handleApply = useCallback(() => {
    if (fetchItem?.length) {
      equippedItem({ invenId: fetchItem[selectItem].invenId });
    }
  }, [equippedItem, fetchItem, selectItem]);

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
            disabled={itemStatus}
            className={`w-fit ${buttonColor()} rounded-[10px] mt-5 border-2 border-[#6f530d]`}
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
          {Object.keys(INVENTORY_CATEGORY).map(category => (
            <View key={category}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setSelectCategory(category)}
                className={categoryStyle(category)}
              >
                <Text className="text-white px-3 py-[2px] font-PretendardMedium text-[18px]">
                  {category}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        {isLoading ? (
          <ActivityIndicator size="large" color="gray" className="top-20" />
        ) : (
          <Carousel
            gap={60}
            offset={60}
            items={fetchItem}
            pageWidth={screenWidth - (55 + 75) * 2}
            setSelectItem={setSelectItem}
            component="Inventory"
          />
        )}
        <CompleteModal
          completeModalVisible={modalVisible}
          setCompleteModalVisible={setModalVisible}
          item={fetchItem && fetchItem[selectItem]}
        />
      </View>
    </SafeAreaView>
  );
}

export default Inventory;
