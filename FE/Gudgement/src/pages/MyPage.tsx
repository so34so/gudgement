import { useEffect } from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  Image,
  Pressable,
} from "react-native";
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

  const handleScreen = (screen: keyof CommonType.TmyPageScreenName) => {
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
          className="flex flex-col w-full h-full justify-evenly items-start space-y-10
        pb-40"
        >
          <View className="flex flex-row w-full justify-evenly items-center">
            <Pressable onPress={() => handleScreen("Analyze")}>
              <View>
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/analysisMenuIcon.png`,
                  }}
                  className="h-32 w-32"
                />
              </View>
              <View className="w-fit">
                <NavigationButton
                  handleFunction={() => handleScreen("Analyze")}
                  text="    소비 분석    "
                  height="sm"
                  width="sm"
                  size="sm"
                  color="bluesky"
                />
              </View>
            </Pressable>
            <Pressable onPress={() => handleScreen("AnalyzeGoal")}>
              <View>
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/goalMenuIcon.png`,
                  }}
                  className="h-32 w-32"
                />
              </View>
              <View className="w-fit">
                <NavigationButton
                  handleFunction={() => handleScreen("AnalyzeGoal")}
                  text="소비 목표 설정"
                  height="sm"
                  width="sm"
                  size="sm"
                  color="bluesky"
                />
              </View>
            </Pressable>
          </View>
          <View className="flex flex-row w-full justify-evenly">
            <Pressable onPress={() => handleScreen("Pedometer")}>
              <View>
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/pedometerMenuIcon.png`,
                  }}
                  className="h-32 w-32"
                />
              </View>
              <View className="w-fit">
                <NavigationButton
                  handleFunction={() => handleScreen("Pedometer")}
                  text="  만보 챌린지  "
                  height="sm"
                  width="sm"
                  size="sm"
                  color="bluesky"
                />
              </View>
            </Pressable>
            <Pressable onPress={() => handleScreen("ReSettingAccount")}>
              <View>
                <Image
                  source={{
                    uri: `${Config.IMAGE_URL}/asset/banknookMenuIcon.png`,
                  }}
                  className="h-32 w-32"
                />
              </View>
              <View className="w-fit">
                <NavigationButton
                  handleFunction={() => handleScreen("ReSettingAccount")}
                  text="  주계좌 설정  "
                  height="sm"
                  width="sm"
                  size="sm"
                  color="bluesky"
                />
              </View>
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default MyPage;
