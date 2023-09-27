import { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";

import { BarChart, ProgressChart } from "react-native-chart-kit";
import { useQuery } from "@tanstack/react-query";
import { CommonType } from "../types/CommonType";
import { IMAGE_URL } from "@env";
import { textShadow } from "../utils/common";
import NavigationButton from "../components/NavigationButton";
import TagBoxLarge from "../components/TagBoxLarge";
import TagBoxSmall from "../components/TagBoxSmall";
import BasicBox from "../components/BasicBox";
import CustomModal from "../components/CustomModal";
import reactotron from "reactotron-react-native";

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

  useEffect(() => {
    refetch();
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

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFetchMillion = async () => {
    reactotron.log!("만보보상!");
    setModalText("만보보상!");
    openModal();
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
        {/* <View className="absolute bg-black30 w-screen h-screen" /> */}
        <TagBoxLarge
          text01={userData?.email ? userData?.email : "인동파 행동대장"}
          text02={userData?.nickname ? userData?.nickname : "옥계공주"}
          img={`${IMAGE_URL}/asset/mypageIcon.png`}
        />
        <View className="mb-10 flex flex-row justify-center items-center w-fill h-fill m-6 rounded-3xl bg-lightsky60 border-solid border-[2px] border-darkgray">
          <View className="absolute -top-8 -left-5">
            <TagBoxSmall
              text={"옥계공주 님의 소비 추이"}
              img={`${IMAGE_URL}/asset/analysisIcon.png`}
            />
          </View>
          <View className="w-full">
            <BarChart
              data={{
                labels: ["월", "화", "수", "목", "금", "토", "일"],
                datasets: [
                  {
                    data: [20, 45, 28, 80, 99, 43],
                  },
                ],
              }}
              width={340}
              height={220}
              yAxisLabel={"원"}
              chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                barPercentage: 0.7,
                height: 5000,
                fillShadowGradient: "rgba(1, 122, 205, 1)",
                fillShadowGradientOpacity: 1,
                decimalPlaces: 0, // optional, defaults to 2dp
                color: (opacity = 1) => "rgba(1, 122, 205, 1)",
                labelColor: (opacity = 1) => "rgba(0, 0, 0, 1)",

                style: {
                  borderRadius: 16,
                  fontFamily: "Bogle-Regular",
                },
                propsForBackgroundLines: {
                  strokeWidth: 1,
                  stroke: "#e3e3e3",
                  strokeDasharray: "0",
                },
                propsForLabels: {
                  fontFamily: "PretendardExtraBold",
                },
              }}
              style={{
                marginVertical: 8,
                borderRadius: 16,
              }}
            />
          </View>
        </View>
        <View className="flex w-fill p-5">
          <NavigationButton
            handleFunction={() => handleFetchMillion()}
            text="분석"
            height="lg"
            width="lg"
            size="md"
            color="green"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default MyPage;
