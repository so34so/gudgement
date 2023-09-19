import {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
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
import Svg, { Text as SvgText } from "react-native-svg";
import { CommonType } from "../types/CommonType";
import MyCharacter from "../assets/images/character.png";
import Reactotron from "reactotron-react-native";
import BuyModal from "../components/BuyModal";
import CompleteModal from "../components/CompleteModal";
import PointHeader from "../components/PointHeader";
import Carousel from "../components/Carousel";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../queryClient";
import { textShadow } from "../utils/common";
import { API_URL } from "@env";
const screenWidth = Math.round(Dimensions.get("window").width);

interface IresponseParams {
  itemId: number;
  memberId: number;
}
type ShopProps = NativeStackScreenProps<CommonType.RootStackParamList, "Shop">;
function Shop({ route }: ShopProps) {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const myCharacter: ImageSourcePropType = MyCharacter as ImageSourcePropType;
  const offset = useSharedValue(5);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
  const [modalVisible, setModalVisible] = useState<{
    buy?: boolean;
    complete: boolean;
  }>({
    buy: false,
    complete: false,
  });
  const [imageDirection, setImageDirection] = useState<{
    dx: number;
    dy: number;
  }>({ dx: 0, dy: 0 });
  const [selectItem, setSelectItem] = useState(0);
  const selectCategory = route.params.category;
  const imageRef: RefObject<Image> = useRef(null);

  const {
    data: fetchItem,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["fetchShopItem"],
    queryFn: () => fetchShopItem(),
  });

  const [itemStatus, setItemStatus] = useState(true);

  const categoryStyle = () =>
    "rounded-[8px] border-2 border-deepgreen bg-darkgray50";
  const buttonColor = () => {
    return itemStatus ? "bg-sub02" : "bg-red";
  };
  const selectText = () => {
    return fetchItem?.length && fetchItem[selectItem].price
      ? +fetchItem[selectItem].price + " 티끌"
      : "해금 필요";
  };

  async function fetchShopItem() {
    try {
      const response: AxiosResponse<CommonType.Titem[]> = await axios.get(
        `${API_URL}/shop/type`,
        {
          params: {
            type: "decor",
            memberId: 1,
          },
        },
      );
      Reactotron.log!("fetchShopItem", response.data);
      return response.data;
    } catch (errorResponse) {
      if (axios.isAxiosError(errorResponse)) {
        Reactotron.log!("fetchShopItemError", errorResponse);
      }
    }
  }

  const initializeImagePosition = () => {
    const { current } = imageRef;
    if (current) {
      current.measureInWindow((x, y, width, height) => {
        setImageDirection({
          dx: x - 20,
          dy: height / 2 - y / 4,
        });
      });
    }
  };

  useLayoutEffect(() => {
    initializeImagePosition();
  }, []);

  useLayoutEffect(() => {
    if (fetchItem?.length) {
      setItemStatus(fetchItem[selectItem].sold);
    }
  }, [fetchItem, selectItem]);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 500 }),
      -5,
      true,
    );
    refetch();
  }, [offset, refetch]);

  const { mutate: buyItem } = useMutation({
    mutationFn: (params: IresponseParams) =>
      axios.post(`${API_URL}/shop`, null, {
        params: {
          itemId: params.itemId,
          memberId: params.memberId,
        },
      }),
    onSuccess: () => {
      setModalVisible({ ...modalVisible, complete: !modalVisible.buy });
      queryClient.invalidateQueries(["fetchShopItem"]);
    },
  });

  const { mutate: unlockItem } = useMutation({
    mutationFn: (params: IresponseParams) =>
      axios.post(`${API_URL}/shop/hidden`, null, {
        params: {
          itemId: params.itemId,
          memberId: params.memberId,
        },
      }),
    onSuccess: () => {
      setModalVisible({ ...modalVisible, complete: !modalVisible.buy });
      queryClient.invalidateQueries(["fetchShopItem"]);
    },
  });

  const handleItem = useCallback(() => {
    if (fetchItem?.length) {
      if (selectText() === "해금 필요") {
        unlockItem({ itemId: fetchItem[selectItem].id, memberId: 1 });
      } else {
        buyItem({ itemId: fetchItem[selectItem].id, memberId: 1 });
      }
    }
  }, [fetchItem, buyItem, selectItem]);

  const handleGetTitle = useCallback(() => {
    setModalVisible({ ...modalVisible, complete: !modalVisible.buy });
    Reactotron.log!("구매 완료");
  }, [modalVisible]);

  if (error) {
    <View>
      <Text>error</Text>
    </View>;
  }
  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

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
            onPress={() =>
              navigation.navigate("Inventory", { category: selectCategory })
            }
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
                <Image source={myCharacter} ref={imageRef} />
                <View
                  className="z-10"
                  style={{
                    position: "absolute",
                    top: imageDirection.dx,
                    left: imageDirection.dy,
                  }}
                >
                  <Image source={myCharacter} className="w-10 h-10 z-10" />
                </View>
              </Animated.View>
            </View>
            <View className="flex items-center">
              {fetchItem?.length ? (
                <>
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
                      {fetchItem && fetchItem[selectItem].itemName}
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
                      {selectText()}
                    </SvgText>
                  </Svg>
                  <Text
                    numberOfLines={4}
                    ellipsizeMode="tail"
                    className="text-white font-PretendardMedium text-[16px] w-24"
                  >
                    {fetchItem && fetchItem[selectItem].itemContent}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                      elevation: 8,
                    }}
                    className={`w-fit ${buttonColor()} rounded-[10px] mt-5 border-2 border-[#6f530d]`}
                    onPress={handleItem}
                    disabled={itemStatus}
                  >
                    <Text
                      style={textShadow}
                      className="px-4 py-[5px] font-PretendardExtraBold text-white text-[20px]"
                    >
                      {selectText() === "해금 필요" ? "해금" : "구매"}
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <View>
                  <Text className="top-10 font-PretendardBlack text-white text-[16px]">
                    선택한 아이템이 없습니다.
                  </Text>
                </View>
              )}
            </View>
          </View>
        ) : (
          <View className="w-full h-60 flex flex-col top-6 items-center space-y-12 mt-8">
            <Animated.View style={[animatedStyles]}>
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
            </Animated.View>
            <View>
              <Text className=" font-PretendardBlack text-white text-[20px]">
                칭호 어떻게 얻을 수 있는지 적어라
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              style={{
                elevation: 8,
              }}
              className="w-fit bg-red rounded-[10px] mt-5 border-2 border-[#6f530d]"
              onPress={handleGetTitle}
            >
              <Text
                style={textShadow}
                className="px-4 py-[5px] font-PretendardExtraBold text-white text-[20px]"
              >
                구매
              </Text>
            </TouchableOpacity>
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
        <Carousel
          gap={16}
          offset={30}
          items={fetchItem}
          pageWidth={screenWidth - (16 + 45) * 2}
          setSelectItem={setSelectItem}
          component="Shop"
        />
        <BuyModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          item={fetchItem && fetchItem[selectItem]}
        />
        <CompleteModal
          completeModalVisible={modalVisible}
          setCompleteModalVisible={setModalVisible}
          item={fetchItem && fetchItem[selectItem]}
        />
      </View>
    </SafeAreaView>
  );
}

export default Shop;
