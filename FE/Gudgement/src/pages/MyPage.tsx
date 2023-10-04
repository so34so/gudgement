import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useEffect } from "react";
import { View, ImageBackground, ActivityIndicator } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { IMAGE_URL } from "@env";
import NavigationButton from "../components/NavigationButton";
import TagBoxLarge from "../components/TagBoxLarge";
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

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

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

  const handleMoveScreen = async (screen: string) => {
    navigation.navigate(screen);
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
          text01={"내 정보"}
          text02={userData?.nickname ? userData?.nickname : "옥계공주"}
          img={`${IMAGE_URL}/asset/mypageIcon.png`}
        />
        <View className="flex flex-col w-full h-full justify-evenly pb-10">
          <View className="flex flex-row w-full justify-evenly">
            <View className="w-fit">
              <NavigationButton
                handleFunction={() => handleMoveScreen("Analyze")}
                text="    소비 분석    "
                height="sm"
                width="sm"
                size="sm"
                color="bluesky"
              />
            </View>
            <View className="w-fit">
              <NavigationButton
                handleFunction={() => handleMoveScreen("AnalyzeGoal")}
                text="소비 목표 설정"
                height="sm"
                width="sm"
                size="sm"
                color="bluesky"
              />
            </View>
          </View>
          <View className="flex flex-row w-full justify-evenly">
            <View className="w-fit">
              <NavigationButton
                handleFunction={() => handleMoveScreen("Pedometer")}
                text="  만보 챌린지  "
                height="sm"
                width="sm"
                size="sm"
                color="bluesky"
              />
            </View>
            <View className="w-fit">
              <NavigationButton
                handleFunction={() => handleMoveScreen("ReSettingAccount")}
                text="  주계좌 설정  "
                height="sm"
                width="sm"
                size="sm"
                color="bluesky"
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default MyPage;
