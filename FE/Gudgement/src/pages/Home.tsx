import { CommonType } from "../types/CommonType";
import {
  ImageBackground,
  View,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import PointHeader from "../components/PointHeader";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";
import { API_URL, IMAGE_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import reactotron from "reactotron-react-native";
import { ANALYZE_BOX_IMAGE, fetchUser } from "../utils/common";

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
  const {
    data: userData,
    error: fetchError,
    isLoading,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    queryFn: () => fetchUser(),
  });

  const [isStartSingle] = useState(true);
  const [percent, setPercent] = useState(userData?.rate.rate as number);
  const [spend, setSpend] = useState<{
    text: string;
    color: string;
    img: string;
  }>({
    text: "",
    color: "",
    img: `${IMAGE_URL}${ANALYZE_BOX_IMAGE[0]}`,
  });

  useEffect(() => {
    if (percent <= 0.5) {
      setSpend({
        text: "절약",
        color: "text-black",
        img: `${IMAGE_URL}${ANALYZE_BOX_IMAGE[1]}`,
      });
    }
    if (percent > 0.5 && percent <= 0.7) {
      setSpend({
        text: "안정",
        color: "text-black",
        img: `${IMAGE_URL}${ANALYZE_BOX_IMAGE[2]}`,
      });
    }
    if (percent > 0.7 && percent < 1.0) {
      setSpend({
        text: "위험",
        color: "text-red",
        img: `${IMAGE_URL}${ANALYZE_BOX_IMAGE[3]}`,
      });
    }
    if (percent >= 1.0) {
      setSpend({
        text: "초과",
        color: "text-red",
        img: `${IMAGE_URL}${ANALYZE_BOX_IMAGE[4]}`,
      });
    }
  }, [percent]);

  reactotron.log!("userData", userData);

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
          <Text className="text-center font-PretendardBlack bg-green text-black px-2 py-[2px] text-md">
            계좌 잔고
          </Text>
          <Text className="text-center font-PretendardBlack bg-transparent text-black px-2 text-md right-1">
            {userData?.rate.balance
              ? userData?.rate.balance.toLocaleString("ko-KR")
              : 0}{" "}
            원
          </Text>
        </View>
        {isStartSingle ? (
          <>
            <View className="w-[90%] h-[100px] top-[64px] bg-white py-4 flex-row justify-around items-center border-[3px] border-black rounded-xl">
              <View className="flex flex-row justify-center items-center space-x-6">
                <Text
                  className={`font-PretendardBlack ${spend.color} text-2lg`}
                >
                  {spend.text}
                </Text>
                <Image
                  source={{ uri: spend.img }}
                  className="w-16 h-12"
                  resizeMode="contain"
                />
              </View>
              <View className="flex flex-col items-end">
                <Text className="text-black font-PretendardExtraBold text-sm">
                  이번 달 소비
                </Text>
                <Text className="text-black font-PretendardExtraBold text-3lg">
                  {userData?.rate.payment
                    ? userData?.rate.payment.toLocaleString("ko-KR")
                    : 0}{" "}
                  원
                </Text>
              </View>
            </View>
            <View className="top-16">
              <ProgressBar percent={percent} />
            </View>
          </>
        ) : (
          <View className="w-[90%] h-[100px] top-[64px] bg-white py-4 flex-row justify-center space-x-6 items-center border-[3px] border-black rounded-xl">
            <Image
              source={{ uri: `${IMAGE_URL}${ANALYZE_BOX_IMAGE[0]}` }}
              className="w-16 h-16"
              resizeMode="contain"
            />
            <Text className="text-black font-PretendardExtraBold text-sm">
              진행 중인 싱글 플레이가 없습니다!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}
