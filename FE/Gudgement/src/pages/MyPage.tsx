import { View, ImageBackground, Image } from "react-native";

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

function MyPage() {
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
    // labels: ["pedometer", "Bike", "Run"], // optional
    data: [0.6],
    // strokeWidth: 2,
    // stroleColor: "#124518",
    // borderColor: "#124518",
    // borderWidth: 2,
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
          <View>
            <ProgressChart
              data={data}
              width={200}
              height={220}
              strokeWidth={30}
              radius={59}
              chartConfig={{
                backgroundGradientFromOpacity: 0,
                backgroundGradientToOpacity: 0,
                // fillShadowGradientFrom: "#000000",
                // fillShadowGradientFromOpacity: 1,
                // fillShadowGradientFromOffset: 1,
                decimalPlaces: 20, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(25, 25, 55, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              style={{}}
              hideLegend={true}
            />
          </View>
        </View>
        <TagBoxSmall
          text={"이번달 소비 추이"}
          img={`${IMAGE_URL}/asset/analysisIcon.png`}
        />
        <NavigationButton
          handleFunction={() => handleFetchMillion()}
          text="만보 걷기"
          height="sm"
          width="sm"
          size="sm"
          color="lightsky"
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
