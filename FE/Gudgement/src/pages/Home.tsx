import { CommonType } from "../types/CommonType";
import {
  ImageBackground,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import PointHeader from "../components/PointHeader";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import reactotron from "reactotron-react-native";
import {
  checkSpendRate,
  fetchUser,
  screenHeight,
  screenWidth,
} from "../utils/common";
import AnalysisBox from "../components/AnalysisBox";
import Config from "react-native-config";

/**
 * percent: 유저가 설정한 소비내역 대비 얼마만큼 썼는지를 퍼센테이지로 서버한테 달라고 요청해야 함
 * 서버에서 유저가 기준일로 부터 현재까지 쓴 소비 내역 총합만 줄 수 있다고 하면 퍼센트를 직접 계산하면 됨
 * (현재 소비내역 / 유저가 목표로하는 소비내역) * 100
 *
 * 위험, 안정 기준: 설정한 소비내역 대비 70%(0.7)보다 더 많이 쓴 경우엔 위험,
 *  50% ~ 70%는 안정, 그 이하는 절약으로 설정해놓은 상태
 */

export default function Home() {
  /**
   * useQuery data 타입에 대하여
   * 1. data타입은 queryFunction(여기선 fetchUser)의 return 타입과 일치해야 한다.
   * 2. 만약 queryFn에서 함수의 리턴타입을 지정해줬다면 reactQuery는 자동으로 타입을 추론해서 data의 타입에 적용시킨다.
   *
   * 요약: queryFn에 할당한 콜백 함수의 리턴타입을 지정해줬다면 따로 useQuery 옆에 제네릭 타입을 지정해주지 않아도 된다.
   * queryFn을 작성하지 않았다면(다른 컴포넌트에서 데이터만 땡겨오는 경우) 제네릭 타입을 지정해줘야 한다.
   *
   * 아래에서 userData가 ts 에러가 발생한 이유: queryFn에 있는 fetchUser의 리턴타입은 Promise<Tuser | null> 인데
   * data타입은 Tuser로 지정해줬기 때문
   *  */

  const {
    data: userData,
    error: fetchError,
    isLoading,
  } = useQuery({
    queryKey: ["fetchUserInfo"],
    queryFn: () => fetchUser(),
  });

  const [percent, setPercent] = useState(userData?.rate.rate as number);
  const [spend, setSpend] = useState<{
    text: string;
    color: string;
    img: number;
  }>({
    text: "",
    color: "",
    img: 0,
  });

  useEffect(() => {
    if (userData) {
      checkSpendRate(userData, percent, setSpend);
    }
  }, [percent]);

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
        <ImageBackground
          source={{
            uri: `${Config.IMAGE_URL}/asset/homeBackground.png`,
          }}
          resizeMode="stretch"
          style={{ opacity: 0.8, backgroundColor: "black" }}
          className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
        />
        <View className="flex w-full items-center">
          <PointHeader tiggle={userData?.tiggle} level={userData?.level} />
        </View>
        <View className="space-y-2 top-4 flex flex-col w-full justify-center items-start left-4">
          <View className="bg-white rounded-xl flex w-fit h-fit justify-start space-x-2 items-center flex-row overflow-hidden border-[2.5px] border-black">
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
          <View className="flex justify-center items-center w-[92%]">
            <AnalysisBox ProgressBarVisible={true} />
          </View>
        </View>
        <Image
          source={{
            uri: `${Config.IMAGE_URL}/character/stoat.png`,
          }}
          className="w-32 h-48 z-1"
          style={{
            top: screenWidth / 3,
            right: screenHeight / 50,
          }}
        />
      </View>
    </SafeAreaView>
  );
}
