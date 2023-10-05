import { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import CustomModal from "../components/CustomModal";

import { Config } from "react-native-config";

import { CommonType } from "../types/CommonType";
import fetchApi from "../utils/tokenUtils";
import { AxiosResponse } from "axios";
import reactotron from "reactotron-react-native";
import { textShadow } from "../utils/common";

const data = {
  year: 2022,
  month: 8,
  bestAmount: 159000,
  bestDestination: "대하구이",
  frequencyCount: 5,
  frequencyDestination: "GS편의점",
  frequencyAmount: 53200,
  totalMember: 73,
  ranking: 4,
  lastMonthAmount: 340000, // 지난달 총 소비 금액
  lastMonthAmountRate: 56.7, // (기준 목표 없었을 시 null) // 지난달 목표금액 대비 총 소비 비율
  thisMonthAmount: 230000, // 현재까지 이번달 총 소비 금액
  thisMonthAmountRate: 43.2, // (기준 목표 없었을 시 null) // 현재까지 이번달 목표금액 대비 총 소비 비율
};

function AnalyzeDetail(this: unknown) {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const fetchAnalyzeMonth = async () => {
    try {
      const response: AxiosResponse<CommonType.TanalyzeMonth> =
        await fetchApi.post(
          `${Config.API_URL}/mypage/${selectedYear}-${selectedMonth}-${selectedDay}`,
          null,
        );
      reactotron.log!("fetchAnalyzeChart", response.data);
    } catch (error) {
      setModalText(
        `${selectedYear}-${selectedMonth}-${selectedDay} 날짜 그래프 불러오기에 실패하였습니다. 다시 시도해주세요.`,
      );
      openModal();
      reactotron.log!("fetchAnalyzeMonth", error);
    }
  };

  const handleFetchAnalyze = async () => {
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View className="w-full h-full flex justify-center items-center">
      <ImageBackground
        source={{
          uri: `${Config.IMAGE_URL}/asset/mypageBackground.png`,
        }}
        resizeMode="cover"
        className="flex w-full h-full"
      >
        <CustomModal
          alertText={modalText}
          visible={modalVisible}
          closeModal={closeModal}
        />
        <View className="absolute bg-black30 w-screen h-screen" />
        <ScrollView className="m-4 space-y-2">
          <SafeAreaView className="space-y-2 py-4 flex flex-col overflow-hidden justify-start items-center w-fill h-fill rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start">
              <View className="flex flex-row">
                <Text className="font-PretendardExtraBold text-darkgray text-2lg">
                  {userData?.nickname}
                </Text>
                <Text className="font-PretendardBold text-darkgray text-2lg">
                  {" "}
                  님의
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="font-PretendardExtraBold text-darkgray text-2lg">
                  {data.month}월{" "}
                </Text>
                <Text className="font-PretendardBold text-darkgray text-2lg">
                  결산 결과예요.
                </Text>
              </View>
            </View>
            <View className="flex justify-start items-start">
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-darkgray50 text-sm">
                  나의{" "}
                </Text>
                <Text className="font-PretendardExtraBold text-black70 text-sm">
                  {data.year}년 {data.month}월을
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="font-PretendardExtraBold text-black70 text-sm">
                  소비 데이터로{" "}
                </Text>
                <Text className="font-PretendardBold text-darkgray50 text-sm">
                  돌아보세요.
                </Text>
              </View>
            </View>
          </SafeAreaView>

          <SafeAreaView className="space-y-6 p-4 flex flex-col overflow-hidden justify-center items-start w-fill h-fill rounded-3xl bg-bluesky border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start space-y-2">
              <View className="flex flex-row mx-2">
                <Text
                  className="font-PretendardExtraBold text-white text-xs"
                  style={textShadow}
                >
                  {userData?.nickname}
                </Text>
                <Text className="font-PretendardBold text-white90 text-xs">
                  {" "}
                  님의 소비는
                </Text>
              </View>
              <View className="flex flex-row justify-start items-end bg-bluesky px-4 py-2 rounded-xl border-solid border-[3px] border-lightsky">
                <Text
                  className="font-PretendardExtraBold text-white text-sm"
                  style={textShadow}
                >
                  {data.totalMember}명{" "}
                </Text>
                <Text className="font-PretendardBold text-white90 text-sm">
                  중
                </Text>
                <Text
                  className="font-PretendardBold text-white text-2lg"
                  style={textShadow}
                >
                  {" "}
                  {data.ranking}위{" "}
                </Text>
                <Text className="font-PretendardBold text-white90 text-sm">
                  예요.
                </Text>
              </View>
            </View>
            <View className="w-full px-2 border-solid border-t-[2px] border-lightsky60" />
            <View className="flex justify-between w-full px-2">
              <View className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-lightsky border-solid border-[3px] border-white20">
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/monthAngry.png`,
                  }}
                  className="h-[70px] w-[70px]"
                />
              </View>
              <View className="-mt-6 flex justify-start items-end w-full space-y-3">
                <View className="flex flex-row">
                  <Text
                    className="font-PretendardExtraBold text-white text-3xl mr-1"
                    style={textShadow}
                  >
                    찐 거지
                  </Text>
                  <Text
                    className="font-PretendardBold text-white text-3xl"
                    style={textShadow}
                  >
                    를
                  </Text>
                </View>
                <Text
                  className="font-PretendardBold text-white text-3xl"
                  style={textShadow}
                >
                  여기서 뵙네요
                </Text>
              </View>
            </View>
            <View className="w-full px-2 border-solid border-t-[2px] border-lightsky60" />
            <View className="flex justify-start items-start">
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-white70 text-2xs">
                  * 해당 월에 설정한{" "}
                </Text>
                <Text className="font-PretendardExtraBold text-white text-2xs">
                  목표 소비 금액
                </Text>
                <Text className="font-PretendardBold text-white70 text-2xs">
                  과
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-white70 text-2xs ml-3">
                  비슷한 사용자를 기준으로 기록된 순위예요.
                </Text>
              </View>
            </View>
          </SafeAreaView>

          <SafeAreaView className="space-y-6 p-4 flex flex-col overflow-hidden justify-center items-start w-fill h-fill rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start space-y-2">
              <View className="flex mx-2">
                <Text className="font-PretendardExtraBold text-black text-md mb-3">
                  소비 점검 : 고가
                </Text>
                <View className="flex flex-row">
                  <Text className="font-PretendardExtraBold text-black70 text-xs">
                    {userData?.nickname}
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-xs">
                    {" "}
                    님의 소비 중
                  </Text>
                </View>
              </View>
              <View className="flex flex-col space-y-2 w-[340px] justify-evenly items-start bg-white90 px-4 py-4 rounded-xl border-solid border-[3px] border-sub03">
                <View className="flex flex-row justify-start items-end">
                  <View className="flex justify-center items-center bg-buy rounded-lg border-solid border-[3px] border-white">
                    <Text className="font-PretendardExtraBold text-black text-lg px-1">
                      가장 비싼
                    </Text>
                  </View>
                  <Text className="font-PretendardBold text-black50 text-sm pb-1">
                    {" "}
                    내역은
                  </Text>
                </View>
                <View className="flex flex-row justify-start items-end">
                  <Text className="font-PretendardExtraBold text-black text-2lg px-1 border-solid border-b-[3px] border-buy">
                    {data.bestDestination}
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-sm pb-1">
                    {" "}
                    예요.
                  </Text>
                </View>
                <View className="pt-20 w-full px-2 border-solid border-b-[2px] border-sub03" />
                <View className="mt-3 flex justify-start items-end w-full">
                  <View className="flex flex-row">
                    <Text className="font-PretendardExtraBold text-red text-3xl mr-1">
                      - {data.bestAmount.toLocaleString("ko-KR")}
                    </Text>
                    <Text className="font-PretendardBold text-red text-3xl">
                      원
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>

          <SafeAreaView className="space-y-6 p-4 flex flex-col overflow-hidden justify-center items-start w-fill h-fill rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start space-y-2">
              <View className="flex mx-2">
                <Text className="font-PretendardExtraBold text-black text-md mb-3">
                  소비 점검 : 빈도
                </Text>
                <View className="flex flex-row justify-start items-end">
                  <Text className="font-PretendardExtraBold text-black70 text-xs mr-[2px]">
                    {userData?.nickname}
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-xs">
                    님의{" "}
                  </Text>
                  <Text className="font-PretendardExtraBold text-black70 text-xs mr-[2px]">
                    방앗간
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-xs">
                    은
                  </Text>
                </View>
              </View>
              <View className="flex flex-col w-[340px] justify-evenly items-start bg-white90 px-4 py-4 rounded-xl border-solid border-[3px] border-sub03">
                <View className="flex flex-row mb-1 justify-start items-end">
                  <Text className="font-PretendardExtraBold text-black text-2lg mr-1 px-1 border-solid border-b-[3px] border-buy">
                    {data.frequencyDestination}
                  </Text>
                  <Text className="font-PretendardBold text-black50 text-sm pb-1">
                    에서
                  </Text>
                  <View className="flex justify-center items-center mx-1 bg-buy rounded-lg border-solid border-[3px] border-white">
                    <Text className="font-PretendardBold text-black text-2lg">
                      {" "}
                      {data.frequencyCount}번{" "}
                    </Text>
                  </View>
                </View>
                <Text className="font-PretendardBold text-black50 text-sm m-1">
                  지출했어요.
                </Text>
                <View className="pt-20 w-full px-2 border-solid border-b-[2px] border-sub03" />
                <View className="mt-3 flex justify-start items-end w-full">
                  <View className="flex flex-row justify-start items-end">
                    <Text className="font-PretendardBold text-darkgray50 text-lg">
                      총
                    </Text>
                    <Text className="font-PretendardExtraBold text-red text-3xl mr-1">
                      {" "}
                      - {data.frequencyAmount.toLocaleString("ko-KR")}
                    </Text>
                    <Text className="font-PretendardExtraBold text-red text-3xl">
                      원
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </SafeAreaView>

          <SafeAreaView className="space-y-6 p-4 flex flex-col overflow-hidden justify-center items-start w-fill h-fill rounded-3xl bg-bluesky border-solid border-[3px] border-darkgray">
            <View className="flex justify-start items-start space-y-2">
              <View className="flex flex-row mx-2">
                <Text
                  className="font-PretendardExtraBold text-white text-xs"
                  style={textShadow}
                >
                  {userData?.nickname}
                </Text>
                <Text className="font-PretendardBold text-white90 text-xs">
                  {" "}
                  님의 소비는
                </Text>
              </View>
              <View className="flex flex-row justify-start items-end bg-bluesky px-4 py-2 rounded-xl border-solid border-[3px] border-lightsky">
                <Text
                  className="font-PretendardExtraBold text-white text-sm"
                  style={textShadow}
                >
                  {data.totalMember}명{" "}
                </Text>
                <Text className="font-PretendardBold text-white90 text-sm">
                  중
                </Text>
                <Text
                  className="font-PretendardBold text-white text-2lg"
                  style={textShadow}
                >
                  {" "}
                  {data.ranking}위{" "}
                </Text>
                <Text className="font-PretendardBold text-white90 text-sm">
                  예요.
                </Text>
              </View>
            </View>
            <View className="w-full px-2 border-solid border-t-[2px] border-lightsky60" />
            <View className="flex justify-between w-full px-2">
              <View className="w-[100px] h-[100px] flex justify-center items-center rounded-full bg-lightsky border-solid border-[3px] border-white20">
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/monthAngry.png`,
                  }}
                  className="h-[70px] w-[70px]"
                />
              </View>
              <View className="-mt-6 flex justify-start items-end w-full space-y-3">
                <View className="flex flex-row">
                  <Text
                    className="font-PretendardExtraBold text-white text-3xl mr-1"
                    style={textShadow}
                  >
                    찐 거지
                  </Text>
                  <Text
                    className="font-PretendardBold text-white text-3xl"
                    style={textShadow}
                  >
                    를
                  </Text>
                </View>
                <Text
                  className="font-PretendardBold text-white text-3xl"
                  style={textShadow}
                >
                  여기서 뵙네요
                </Text>
              </View>
            </View>
            <View className="w-full px-2 border-solid border-t-[2px] border-lightsky60" />
            <View className="flex justify-start items-start">
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-white70 text-2xs">
                  * 해당 월에 설정한{" "}
                </Text>
                <Text className="font-PretendardExtraBold text-white text-2xs">
                  목표 소비 금액
                </Text>
                <Text className="font-PretendardBold text-white70 text-2xs">
                  과
                </Text>
              </View>
              <View className="flex flex-row">
                <Text className="font-PretendardBold text-white70 text-2xs ml-3">
                  비슷한 사용자를 기준으로 기록된 순위예요.
                </Text>
              </View>
            </View>
          </SafeAreaView>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

export default AnalyzeDetail;
