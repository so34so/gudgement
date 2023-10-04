import { useEffect, useState } from "react";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";

import { ProgressChart } from "react-native-chart-kit";
import { useQuery } from "@tanstack/react-query";
import { CommonType } from "../types/CommonType";
import { textShadow } from "../utils/common";
import NavigationButton from "../components/NavigationButton";
import TagBoxSmall from "../components/TagBoxSmall";
import BasicBox from "../components/BasicBox";
import CustomModal from "../components/CustomModal";
import reactotron from "reactotron-react-native";
import Config from "react-native-config";

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

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

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
        <TagBoxSmall
          text={"만보 걷기 챌린지"}
          img={`${Config.IMAGE_URL}/asset/analysisIcon.png`}
        />
        <View className="mb-10 flex flex-row justify-center items-center w-fill h-fill m-6 rounded-3xl bg-lightsky60 border-solid border-[2px] border-darkgray">
          <View className="ml-8 mt-4">
            <Image
              source={{
                uri: `${Config.IMAGE_URL}/asset/dogezaPenguin.png`,
              }}
              className="w-fill h-[100px] mb-4"
            />
            <BasicBox text={"뚜벅뚜벅뚜벅뚜벅..."} />
          </View>
          <View className="flex justify-center items-center mt-6 mr-2">
            <View className="flex justify-center items-center">
              <ProgressChart
                data={{
                  data: [0.6],
                  colors: ["#3190FF"],
                }}
                width={200}
                height={200}
                strokeWidth={30}
                radius={59}
                chartConfig={{
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                withCustomBarColorFromData={true}
                style={{ zIndex: 2 }}
                hideLegend={true}
              />
              <ProgressChart
                data={{
                  data: [0.6],
                  colors: ["#000000b2"],
                }}
                width={200}
                height={200}
                strokeWidth={38}
                radius={59}
                chartConfig={{
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientToOpacity: 0,
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                withCustomBarColorFromData={true}
                style={{ position: "absolute", zIndex: 1 }}
                hideLegend={true}
              />
            </View>
            <View className="absolute z-10 pb-[150px]">
              <NavigationButton
                handleFunction={() => handleFetchMillion()}
                text="보상 받기"
                height="sm"
                width="sm"
                size="sm"
                color="bluesky"
              />
            </View>
            <View className="flex flex-col bg-darkgray50 h-20 w-20 justify-center items-center absolute z-0 rounded-full">
              <Text
                style={textShadow}
                className="text-center text-white text-md font-PretendardExtraBold"
                numberOfLines={1}
              >
                10000
              </Text>
              <Text
                style={textShadow}
                className="text-center text-white text-xs font-PretendardBold"
                numberOfLines={1}
              >
                걸음
              </Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default MyPage;
