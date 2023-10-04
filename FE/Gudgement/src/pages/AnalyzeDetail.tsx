import { useEffect, useState } from "react";
import { Text, View, ImageBackground, ActivityIndicator } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";

import CustomModal from "../components/CustomModal";
import NavigationButton from "../components/NavigationButton";
import TagBoxSmall from "../components/TagBoxSmall";

import { Config } from "react-native-config";

import { CommonType } from "../types/CommonType";
import fetchApi from "../utils/tokenUtils";
import { AxiosResponse } from "axios";
import reactotron from "reactotron-react-native";

const data = {
  month: 8,
  bestAmount: 159000, // 가장 큰 소비 금액
  bestDestination: "대하구이", // 가장 큰 소비 내역
  frequencyCount: 5, // 가장 많은 빈도 횟수
  frequencyDestination: "GS편의점", // 가장 많은 빈도 내역
  frequencyAmount: 53200, // 가장 많은 빈도 촡합
  totalMember: 73, // (기준 목표 없었을 시 null) 목표금액 +-10 인원수
  ranking: 4, // (기준 목표 없었을 시 null) 인원수 중 순위
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
        <View className="flex flex-col overflow-hidden justify-center items-center w-fill h-fill m-4 rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
          <Text>dd</Text>
        </View>
      </ImageBackground>
    </View>
  );
}

export default AnalyzeDetail;
