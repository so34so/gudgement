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
import { API_URL, IMAGE_URL, SERVER_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosResponse } from "axios";
import { CommonType } from "../types/CommonType";
import reactotron from "reactotron-react-native";
import messaging from "@react-native-firebase/messaging";
import { getAsyncData, screenHeight, screenWidth } from "../utils/common";

/**
 * percent: 유저가 설정한 소비내역 대비 얼마만큼 썼는지를 퍼센테이지로 서버한테 달라고 요청해야 함
 * 서버에서 유저가 기준일로 부터 현재까지 쓴 소비 내역 총합만 줄 수 있다고 하면 퍼센트를 직접 계산하면 됨
 * (현재 소비내역 / 유저가 목표로하는 소비내역) * 100
 *
 * 위험, 안정 기준: 설정한 소비내역 대비 70%(0.7)보다 더 많이 쓴 경우엔 위험,
 *  50% ~ 70%는 안정, 그 이하는 절약으로 설정해놓은 상태
 */
export default function Home() {
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

  async function fetchUser() {
    const token = await getAsyncData("accessToken");
    try {
      const response: AxiosResponse<CommonType.TUser> = await axios.get(
        `${API_URL}/member/loadMyInfo`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      reactotron.log!("fetchUser", response);
      return response.data;
    } catch (error) {
      reactotron.log!("error", error);
    }
  }
  const {
    data: user,
    error: fetchError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["fetchUserInfo"],
    queryFn: () => fetchUser(),
  });

  useEffect(() => {
    async function sendToken(myInfo: CommonType.TUser) {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        console.log("phone token", token);
        // dispatch(userSlice.actions.setPhoneToken(token));
        const response = await axios.put(`${SERVER_URL}/fcm/token`, {
          id: myInfo.memberId,
          firebaseToken: token,
        });
        reactotron.log!(response.data);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
    if (isSuccess && user) {
      sendToken(user);
    }
  }, [isSuccess, user]);

  // if (fetchError) {
  //   return (
  //     <View>
  //       <Text>에러</Text>
  //     </View>
  //   );
  // }
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
        <PointHeader />
        <ImageBackground
          source={{
            uri: `${IMAGE_URL}/asset/homeBackground.png`,
          }}
          resizeMode="stretch"
          style={{ opacity: 0.8, backgroundColor: "black" }}
          className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
        />
        <View className="absolute top-20 left-5 bg-white rounded-[5px] flex w-fit h-fit justify-start space-x-2 items-center flex-row border-2 border-black">
          <Text className="text-center font-PretendardBlack bg-green text-black px-2 py-[2px] text-[20px] rounded-tl-[5px] rounded-bl-[5px]">
            계좌 잔고
          </Text>
          <Text className="text-center font-PretendardBlack bg-transparent text-black px-2 text-[20px] right-1">
            999,999원
          </Text>
        </View>
        {isStartSingle ? (
          <>
            <View className="w-[90%] top-[64px] bg-white py-4 flex-row justify-around items-center border-[3px] border-black rounded-[5px]">
              <View className="flex flex-row w-fit h-fit justify-center items-center">
                <Text
                  className={`font-PretendardBlack ${spend.color} text-[24px]`}
                >
                  {spend.text}
                </Text>
                <Image
                  source={goodIcon}
                  className="w-16 h-12 bottom-1"
                  resizeMode="contain"
                />
              </View>
              <View className="flex flex-col w-fit h-fit">
                <Text className="text-black font-PretendardExtraBold text-[16px]">
                  이번 달 소비
                </Text>
                <Text className="text-black font-PretendardExtraBold text-[24px]">
                  1,400,000원
                </Text>
              </View>
            </View>
            <View className="top-16">
              <ProgressBar percent={percent} />
            </View>
          </>
        ) : (
          <View className="w-[90%] top-[64px] bg-white py-4 flex-row justify-center space-x-6 items-center border-[3px] border-black rounded-[5px]">
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
        <Image
          source={{
            uri: `${IMAGE_URL}/character/stoat.png`,
          }}
          className="w-32 h-48 z-1"
          style={{
            top: screenWidth / 2.5,
            right: screenHeight / 35,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
