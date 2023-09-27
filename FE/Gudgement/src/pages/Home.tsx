import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import {
  ImageBackground,
  ImageSourcePropType,
  View,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import PointHeader from "../components/PointHeader";
import GoodIcon from "../assets/icons/goodIcon.png";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";
import { API_URL, IMAGE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";
import reactotron from "reactotron-react-native";
import { fetchUser, getAsyncData, updateAsyncData } from "../utils/common";

/**
 * percent: 유저가 설정한 소비내역 대비 얼마만큼 썼는지를 퍼센테이지로 서버한테 달라고 요청해야 함
 * 서버에서 유저가 기준일로 부터 현재까지 쓴 소비 내역 총합만 줄 수 있다고 하면 퍼센트를 직접 계산하면 됨
 * (현재 소비내역 / 유저가 목표로하는 소비내역) * 100
 *
 * 위험, 안정 기준: 설정한 소비내역 대비 70%(0.7)보다 더 많이 쓴 경우엔 위험,
 *  50% ~ 70%는 안정, 그 이하는 절약으로 설정해놓은 상태
 */
console.log(API_URL);
console.log(IMAGE_URL);
export default function Home() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const goodIcon: ImageSourcePropType = GoodIcon as ImageSourcePropType;
  const [percent, setPercent] = useState(0.6);
  const [spend, setSpend] = useState<{ text: string; color: string }>({
    text: "",
    color: "",
  });
  const [isStartSingle] = useState(true);

  useEffect(() => {
    if (percent <= 0.5) {
      setSpend({ text: "절약", color: "text-black" });
    }
    if (percent > 0.5 && percent <= 0.7) {
      setSpend({ text: "안정", color: "text-black" });
    }
    if (percent > 0.7) {
      setSpend({ text: "위험", color: "text-red" });
    }
  }, [percent]);

  // const fetchUser = async () => {
  //   const loginData = (await getAsyncData(
  //     "loginData",
  //   )) as CommonType.TloginData;
  //   reactotron.log!(loginData.accessToken);
  //   try {
  //     const response: AxiosResponse<CommonType.Tuser> = await axios.get(
  //       `${API_URL}/member/loadMyInfo`,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${loginData.accessToken}`,
  //         },
  //       },
  //     );
  //     reactotron.log!("fetchUser", response);
  //     return response.data;
  //   } catch (error) {
  //     const axiosError = error as AxiosError<CommonType.Terror>;
  //     if (axiosError.response) {
  //       const errorMessage = axiosError.response.data.message;
  //       reactotron.log!("홈 에러", errorMessage);
  //     }
  //     throw error;
  //   }
  // };

  const {
    data: userData,
    error: fetchError,
    isLoading,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    queryFn: () => fetchUser(),
  });

  reactotron.log!("userData", userData);

  if (fetchError) {
    return (
      <View>
        <Text>에러</Text>
      </View>
    );
  }
  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <SafeAreaView>
      <View className="w-full h-full flex justify-start items-center">
        <PointHeader tiggle={userData?.tiggle} level={userData?.level} />
        <ImageBackground
          source={{
            uri: `${IMAGE_URL}/asset/homeBackground.png`,
          }}
          resizeMode="stretch"
          style={{ opacity: 0.8, backgroundColor: "black" }}
          className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
        />
        <View className="absolute top-20 left-6 bg-white rounded-lg flex w-fit h-fit justify-start space-x-2 items-center flex-row overflow-hidden border-[2.5px] border-black">
          <Text className="text-center font-PretendardBlack bg-green text-black px-2 py-[2px] text-[20px]">
            계좌 잔고
          </Text>
          <Text className="text-center font-PretendardBlack bg-transparent text-black px-2 text-[20px] right-1">
            999,999원
          </Text>
        </View>
        {isStartSingle ? (
          <>
            <View className="w-[90%] top-[64px] bg-white py-4 flex-row justify-around items-center border-[3px] border-black rounded-xl">
              <Text
                className={`font-PretendardBlack ${spend.color} text-[24px]`}
              >
                {spend.text}
              </Text>
              <Image
                source={goodIcon}
                className="w-16 h-12"
                resizeMode="contain"
              />
              <View className="flex flex-col">
                <Text className="text-black font-PretendardExtraBold text-[16px]">
                  이번 달 소비
                </Text>
                <Text className="text-black font-PretendardExtraBold text-[24px]">
                  14,742,096원
                </Text>
              </View>
            </View>
            <View className="top-16">
              <ProgressBar percent={percent} />
            </View>
          </>
        ) : (
          <View className="w-[90%] top-[64px] bg-white py-4 flex-row justify-center space-x-6 items-center border-[3px] border-black rounded-xl">
            <Image
              source={goodIcon}
              className="w-16 h-12"
              resizeMode="contain"
            />
            <Text className="text-black font-PretendardExtraBold text-[18px]">
              진행 중인 싱글 플레이가 없습니다!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
