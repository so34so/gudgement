import { useEffect } from "react";
import { View, ImageBackground, ActivityIndicator, Image } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Config from "react-native-config";
import { useQuery } from "@tanstack/react-query";

import NavigationButton from "../components/NavigationButton";
import TagBoxLarge from "../components/TagBoxLarge";

import { CommonType } from "../types/CommonType";

function MyPage(this: unknown) {
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

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const handleMoveScreen = async (
    screen: keyof CommonType.TmyPageScreenName,
  ) => {
    navigation.navigate(screen);
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
        <TagBoxLarge
          text01={"내 정보"}
          text02={userData?.nickname ? userData?.nickname : "옥계공주"}
          img={`${Config.IMAGE_URL}/asset/mypageIcon.png`}
        />
        <View
          className="flex flex-col w-full h-fill justify-evenly space-y-10
        pt-10"
        >
          <View className="flex flex-row w-full justify-evenly">
            <View>
              <View>
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/bluecard.png`,
                  }}
                  className="h-32 w-32"
                />
              </View>
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
            </View>
            <View>
              <View>
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/bluecard.png`,
                  }}
                  className="h-32 w-32"
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
          </View>
          <View className="flex flex-row w-full justify-evenly">
            <View>
              <View>
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/bluecard.png`,
                  }}
                  className="h-32 w-32"
                />
              </View>
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
            </View>
            <View>
              <View>
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/bluecard.png`,
                  }}
                  className="h-32 w-32"
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
        </View>
      </ImageBackground>
    </View>
  );
}

export default MyPage;
