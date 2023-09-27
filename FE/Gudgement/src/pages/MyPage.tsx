import {
  View,
  ImageBackground,
  Image,
  ColorValue,
  StyleSheet,
} from "react-native";

import { ProgressChart } from "react-native-chart-kit";

import NavigationButton from "../components/NavigationButton";
import TagBoxLarge from "../components/TagBoxLarge";
import TagBoxSmall from "../components/TagBoxSmall";
import BasicBox from "../components/BasicBox";

import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import reactotron from "reactotron-react-native";
import { useEffect } from "react";
import { CommonType } from "../types/CommonType";
import { IMAGE_URL } from "@env";

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

  const data = {
    data: [0.6],
    colors: ["#3190FF"],
  };

  const dataSub = {
    data: [0.6],
    colors: ["#000000b2"],
  };

  const handleFetchMillion = async () => {
    reactotron.log!("만보보상!");
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
        <TagBoxLarge
          text01={userData?.email ? userData?.email : "인동파 행동대장"}
          text02={userData?.nickname ? userData?.nickname : "옥계공주"}
          img={`${IMAGE_URL}/asset/mypageIcon.png`}
        />
        <View className="mb-10 flex flex-row justify-center items-center">
          <View>
            <Image
              source={{
                uri: `${IMAGE_URL}/asset/dogezaPenguin.png`,
              }}
              className="w-fill h-[100px] mb-4"
            />
            <BasicBox text={"뚜벅뚜벅뚜벅뚜벅..."} />
          </View>
          <View className="flex justify-center items-center mt-6">
            <View className="flex justify-center items-center">
              <ProgressChart
                data={data}
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
                style={{ zIndex: 1 }}
                hideLegend={true}
              />
              <ProgressChart
                data={dataSub}
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
                style={{ position: "absolute", zIndex: 0 }}
                hideLegend={true}
              />
            </View>
            <View className="absolute z-20 pb-[150px]">
              <NavigationButton
                handleFunction={() => handleFetchMillion()}
                text="보상 받기"
                height="sm"
                width="sm"
                size="sm"
                color="bluesky"
              />
            </View>
          </View>
        </View>
        <TagBoxSmall
          text={"이번달 소비 추이"}
          img={`${IMAGE_URL}/asset/analysisIcon.png`}
        />
        <NavigationButton
          handleFunction={() => handleFetchMillion()}
          text="분석"
          height="sm"
          width="sm"
          size="md"
          color="green"
        />
      </ImageBackground>
    </View>
  );
}

export default MyPage;
