import { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";

import { BarChart } from "react-native-chart-kit";
import { useQuery } from "@tanstack/react-query";
import { CommonType } from "../types/CommonType";
import { API_URL, IMAGE_URL } from "@env";
import { getAsyncData } from "../utils/common";
import NavigationButton from "../components/NavigationButton";
import TagBoxLarge from "../components/TagBoxLarge";
import TagBoxSmall from "../components/TagBoxSmall";
import CustomModal from "../components/CustomModal";
import reactotron from "reactotron-react-native";
import axios, { AxiosResponse } from "axios";
import AnalysisBox from "../components/AnalysisBox";

function MyPage(this: unknown) {
  const {
    data: userData,
    error: fetchError,
    isLoading,
    refetch,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [chartData, setChartData] = useState<CommonType.TanalyzeChart>({
    month: 0,
    week: 0,
    data: {
      type: "",
      labels: ["월", "화", "수", "목", "금", "토", "일"],
      dateSet: {
        amount: [0, 0, 0, 0, 0, 0, 0],
        color: ["", "", "", "", "", "", ""],
      },
    },
  });

  useEffect(() => {
    refetch();
    fetchAnalyzeChartToday();
  }, []);

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  if (fetchError) {
    reactotron.log!(fetchError);
  } else {
    reactotron.log!("홈 사용자 정보", userData);
  }

  const fetchAnalyzeChartToday = async () => {
    const loginData = (await getAsyncData(
      "loginData",
    )) as CommonType.TloginData;
    try {
      const response: AxiosResponse<CommonType.TanalyzeChart> =
        await axios.post(`${API_URL}/mypage`, null, {
          headers: {
            Authorization: `Bearer ${loginData.accessToken}`,
          },
        });
      reactotron.log!("fetchAnalyzeChartToday", response);
      setChartData(response.data);
    } catch (error) {
      reactotron.log!("fetchAnalyzeChartToday", error);
    }
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFetchAnalyze = () => {
    reactotron.log!("분석 클릭!");
  };

  return (
    <View className="w-full h-full flex justify-center items-center">
      <ImageBackground
        source={{
          uri: `${IMAGE_URL}/asset/mypageBackground.png`,
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
        <View className="flex flex-row justify-between items-center">
          <TagBoxSmall
            text={`${userData?.nickname} 님의 소비 추이`}
            img={`${IMAGE_URL}/asset/analysisIcon.png`}
          />
        </View>
        <View className="flex flex-col overflow-hidden justify-center items-center w-fill h-fill mx-6 rounded-3xl bg-white90 border-solid border-[3px] border-darkgray">
          <View className="-mt-1">
            <AnalysisBox ProgressBarVisible={false} />
          </View>
          <View className="w-full">
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row justify-start items-center m-4 space-x-2">
                <View className="bg-white50 w-[64px] rounded-lg flex justify-center items-center border-solid border-darkgray border-[2px]">
                  <Text
                    className="font-PretendardBold text-black px-2 py-[2px] text-xs"
                    numberOfLines={1}
                  >
                    {chartData.month}월 >
                  </Text>
                </View>
                <View className="bg-white50 w-[80px] rounded-lg flex justify-center items-center border-solid border-darkgray border-[2px]">
                  <Text
                    className="font-PretendardBold text-black px-2 py-[2px] text-xs"
                    numberOfLines={1}
                  >
                    {chartData.week}주차 >
                  </Text>
                </View>
              </View>
              <View className="bg-lightsky w-[24px] h-[24px] rounded-full flex justify-center items-center m-4 ">
                <Text
                  className="font-PretendardBold text-white text-2xs"
                  numberOfLines={1}
                >
                  i
                </Text>
              </View>
            </View>
            <BarChart
              data={{
                labels: chartData.data.labels,
                datasets: [
                  {
                    data: chartData.data.dateSet.amount,
                  },
                ],
              }}
              width={400}
              height={220}
              chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                barPercentage: 0.4,
                fillShadowGradient: "rgba(52, 184, 89, 1)",
                fillShadowGradientFromOpacity: 1,
                fillShadowGradientToOpacity: 1,
                fillShadowGradientOpacity: 1,
                fillShadowGradientTo: "rgba(52, 184, 89, 1)",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(50, 50, 50, ${opacity})`,
                strokeWidth: 40,
                barRadius: 6,
                propsForLabels: {
                  fontSize: 12,
                  fontFamily: "Pretendard-Bold",
                },
              }}
              showBarTops={false}
              showValuesOnTopOfBars={true}
              fromZero
              fromNumber={0}
              withInnerLines={false}
              withHorizontalLabels={false}
              withVerticalLabels={true}
              // withCustomBarColorFromData={true}
              flatColor={true}
              style={{
                marginVertical: 0,
                marginHorizontal: -40,
              }}
            />
            <View className="px-4 pb-4">
              <NavigationButton
                handleFunction={() => handleFetchAnalyze()}
                text={`${chartData.month}월 분석`}
                height="sm"
                width="md"
                size="sm"
                color="green"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default MyPage;
