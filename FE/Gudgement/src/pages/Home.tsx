import {
  ImageBackground,
  ImageSourcePropType,
  View,
  SafeAreaView,
  Text,
  Image,
} from "react-native";
import RankingBackground from "../assets/images/homeBackground.png";
import PointHeader from "../components/PointHeader";
import GoodIcon from "../assets/icons/goodIcon.png";
import ProgressBar from "../components/ProgressBar";
import { useEffect, useState } from "react";
/**
 * percent: 유저가 설정한 소비내역 대비 얼마만큼 썼는지를 퍼센테이지로 서버한테 달라고 요청해야 함
 * 서버에서 유저가 기준일로 부터 현재까지 쓴 소비 내역 총합만 줄 수 있다고 하면 퍼센트를 직접 계산하면 됨
 * (현재 소비내역 / 유저가 목표로하는 소비내역) * 100
 *
 * 위험, 안정 기준: 설정한 소비내역 대비 70%(0.7)보다 더 많이 쓴 경우엔 위험,
 *  50% ~ 70%는 안정, 그 이하는 절약으로 설정해놓은 상태
 */
export default function Home() {
  const rankingBackground: ImageSourcePropType =
    RankingBackground as ImageSourcePropType;
  const goodIcon: ImageSourcePropType = GoodIcon as ImageSourcePropType;
  const [percent, setPercent] = useState(0.5);
  const [spend, setSpend] = useState<{ text: string; color: string }>({
    text: "",
    color: "",
  });
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
  return (
    <SafeAreaView>
      <View className="w-full h-full flex justify-start items-center">
        <PointHeader />
        <ImageBackground
          source={rankingBackground}
          resizeMode="stretch"
          style={{ opacity: 0.8, backgroundColor: "black" }}
          className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
        />
        <View className="absolute top-20 left-4 bg-white rounded-[5px] flex w-fit h-fit justify-start space-x-2 items-center flex-row border-2 border-black">
          <Text className="text-center font-PretendardBlack bg-green text-black px-2 py-[2px] text-[20px] rounded-tl-[5px] rounded-bl-[5px]">
            계좌 잔고
          </Text>
          <Text className="text-center font-PretendardBlack bg-transparent text-black px-2 text-[20px] right-1">
            999,999원
          </Text>
        </View>
        <View className="w-[90%] top-[64px] bg-white py-4 flex-row justify-around items-center border-[3px] border-black rounded-[5px]">
          <Text className={`font-PretendardBlack ${spend.color} text-[24px]`}>
            {spend.text}
          </Text>
          <Image source={goodIcon} className="w-16 h-12" resizeMode="contain" />
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
      </View>
    </SafeAreaView>
  );
}
