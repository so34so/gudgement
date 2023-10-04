import { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { CommonType } from "../types/CommonType";
import { ANALYZE_BOX_IMAGE, checkSpendRate } from "../utils/common";
import ProgressBar from "./ProgressBar";
import reactotron from "reactotron-react-native";
import Config from "react-native-config";

function AnalysisBox({ ProgressBarVisible }: { ProgressBarVisible: boolean }) {
  const {
    data: userData,
    error: fetchError,
    isLoading,
    refetch,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  const [isStartSingle] = useState(true);
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
    refetch();
  }, []);

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
    <View className="w-fill">
      {isStartSingle ? (
        <>
          <View className="w-[400px] h-fill bg-white py-4 flex-row justify-evenly items-center border-[3px] border-darkgray rounded-2xl">
            <View className="flex flex-row justify-center items-center space-x-6">
              <Text
                className={`font-PretendardExtraBold ${spend.color} text-2lg`}
              >
                {spend.text}
              </Text>
              <Image
                source={{
                  uri: `${Config.IMAGE_URL}${ANALYZE_BOX_IMAGE[spend.img]}`,
                }}
                className="w-16 h-12"
                resizeMode="contain"
              />
            </View>
            <View className="flex flex-col items-end">
              <Text className="text-darkgray font-PretendardExtraBold text-xs">
                이번 달 소비
              </Text>
              <Text className="text-darkgray font-PretendardExtraBold text-lg">
                {userData?.rate.totalAmount
                  ? userData?.rate.totalAmount.toLocaleString("ko-KR")
                  : 0}{" "}
                원
              </Text>
            </View>
          </View>
          {ProgressBarVisible && (
            <View className="">
              <ProgressBar percent={percent} />
            </View>
          )}
        </>
      ) : (
        <View className="w-[380px] h-fill bg-white py-4 flex-row justify-evenly items-center border-[3px] border-darkgray rounded-2xl">
          <View className="flex flex-row justify-center items-center space-x-6">
            <Image
              source={{ uri: `${Config.IMAGE_URL}${ANALYZE_BOX_IMAGE[0]}` }}
              className="w-16 h-12"
              resizeMode="contain"
            />
            <Text className="text-black font-PretendardExtraBold text-sm">
              목표 절약 금액을 설정해주세요!
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default AnalysisBox;
