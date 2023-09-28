import { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import ProgressBar from "./ProgressBar";
import { IMAGE_URL } from "@env";
import { ANALYZE_BOX_IMAGE, checkSpendRate } from "../utils/common";
import { useQuery } from "@tanstack/react-query";
import { CommonType } from "../types/CommonType";
import reactotron from "reactotron-react-native";

function AnalysisBox() {
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
    <View>
      {isStartSingle ? (
        <>
          <View className="w-[full] h-[100px] bg-white py-4 flex-row justify-around items-center border-[3px] border-black rounded-3xl">
            <View className="flex flex-row justify-center items-center space-x-6">
              <Text className={`font-PretendardBlack ${spend.color} text-2lg`}>
                {spend.text}
              </Text>
              <Image
                source={{
                  uri: `${IMAGE_URL}${ANALYZE_BOX_IMAGE[spend.img]}`,
                }}
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
          <View className="">
            <ProgressBar percent={percent} />
          </View>
        </>
      ) : (
        <View className="w-[90%] h-[100px] top-[64px] bg-white py-4 flex-row justify-center space-x-6 items-center border-[3px] border-black rounded-xl">
          <Image
            source={{ uri: `${IMAGE_URL}${ANALYZE_BOX_IMAGE[0]}` }}
            className="w-16 h-12"
            resizeMode="contain"
          />
          <Text className="text-black font-PretendardExtraBold text-sm">
            진행 중인 싱글 플레이가 없습니다!
          </Text>
        </View>
      )}
    </View>
  );
}

export default AnalysisBox;
