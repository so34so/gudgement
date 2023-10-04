import {
  View,
  ImageBackground,
  ImageSourcePropType,
  Text,
  Image,
  FlatList,
  FlatListProps,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Jilta from "../assets/images/jilta.png";
import Svg, { Text as SvgText } from "react-native-svg";
import { useQuery } from "@tanstack/react-query";
import Config from "react-native-config";
import fetchApi from "../utils/tokenUtils";
import { getAsyncData } from "../utils/common";
import reactotron from "reactotron-react-native";
import axios, { AxiosResponse } from "axios";

interface Irank {
  rankingList: [
    {
      ranking: number;
      nickname: string;
      level: number;
      character: string;
    },
  ];
  myRanking: {
    ranking: number;
    nickname: string;
    level: number;
    character: string;
  };
}

export default function Ranking() {
  const jilta: ImageSourcePropType = Jilta as ImageSourcePropType;
  const styleLevel = (rank: number) => {
    return `${rank >= 10 ? "right-[-30px]" : "right-[-40px]"}`;
  };
  const topRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-red";
      case 2:
        return "bg-buy";
      case 3:
        return "bg-deepgreen";
    }
  };
  async function fetchRanking() {
    const userId: number | null = await getAsyncData("id");
    try {
      const response: AxiosResponse<Irank> = await axios.get(
        `${Config.API_URL}/ranking/${userId}`,
      );
      return response.data;
    } catch (error) {
      reactotron.log!("error", error);
    }
  }
  const {
    data: rankingList,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["fetchRankingList"],
    queryFn: () => fetchRanking(),
  });
  const flatListProps: FlatListProps<{
    ranking: number;
    nickname: string;
    level: number;
    character: string;
  }> = {
    data: rankingList?.rankingList?.slice(3, rankingList.rankingList.length),
    renderItem: ({ item }) => {
      return (
        <View className="w-full h-20 my-4 justify-center items-center">
          <View className="flex-row w-[90%] h-24 bg-white border-[3px] border-black rounded-[10px]">
            <View className="flex-row justify-start space-x-2 items-center ml-4 rounded-[10px]">
              <Text className="font-PretendardExtraBold text-[30px] text-black">
                {item.ranking}
              </Text>
              <Image source={jilta} />
              <Svg className="w-24 h-10">
                <SvgText
                  fill="white"
                  stroke="black"
                  fontSize="24"
                  fontFamily="Pretendard-ExtraBold"
                  x={44}
                  y={30}
                  textAnchor="middle"
                >
                  {item.nickname}
                </SvgText>
              </Svg>
              <View
                className={`relative ${styleLevel(
                  item.ranking,
                )} flex flex-row justify-center items-center rounded-[20px] w-fit bg-white
      box-border h-8 text-center text-black border-[2px] border-solid border-black`}
              >
                <Text className="text-white w-10 rounded-l-[20px] h-full bg-black text-center text-[18px] font-PretendardMedium">
                  Lv
                </Text>
                <Text className="text-black text-[18px] font-PretendardBold px-2">
                  {item.level}
                </Text>
              </View>
            </View>
          </View>
        </View>
      );
    },
  };
  if (isSuccess || isError) {
    reactotron.log!("rankingList", rankingList);
  }
  return (
    <SafeAreaView>
      <ImageBackground
        source={{
          uri: `${Config.IMAGE_URL}/asset/rankingBackground.png`,
        }}
        resizeMode="cover"
        style={{ opacity: 0.9, backgroundColor: "black" }}
        className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
      />
      <View className="w-full h-full bg-transparent">
        <View className="flex flex-row w-full justify-center space-x-10 mt-8 p-4 left-1">
          {rankingList?.rankingList
            ?.slice(0, 3)
            .map(
              (ele: {
                ranking: number;
                nickname: string;
                level: number;
                character: string;
              }) => (
                <View key={ele.ranking}>
                  <View
                    className={`${topRankColor(
                      ele.ranking,
                    )} border-2 border-black w-20 h-20 justify-center items-center rounded-[10px]`}
                  >
                    <View className="absolute top-[-17px] left-[-17px] flex justify-center items-center w-10 h-10 rounded-[99px] bg-white border-solid border-2 border-black">
                      <View className="absolute w-9 h-9 bg-black border-2 flex justify-center items-center border-white rounded-[99px]">
                        <Text className="text-white font-PretendardBold text-[22px]">
                          {ele.ranking}
                        </Text>
                      </View>
                    </View>
                    <Image source={jilta} />
                  </View>
                  <View className="top-[-10px] left-[-7px] flex justify-center items-center w-24 h-fit rounded-[6px] bg-white border-solid border-2 border-black">
                    <View className="w-full h-fit bg-black border-2 flex justify-center items-center border-white rounded-[6px]">
                      <Text className="text-main font-PretendardBold text-[18px] px-2 py-1 whitespace-nowrap text-mainColor">
                        {ele.nickname}
                      </Text>
                    </View>
                  </View>
                </View>
              ),
            )}
        </View>
        <View className="h-[46%]">
          <FlatList {...flatListProps} />
        </View>
        <View className="w-full h-20 mt-2 justify-center items-center">
          <View className="flex-row w-[90%] h-20 bg-mainColor border-[3px] border-black rounded-[10px]">
            <View className="flex-row justify-start space-x-2 items-center ml-4 rounded-[10px]">
              <Text className="font-PretendardExtraBold text-[30px] text-white">
                {rankingList?.myRanking?.ranking}
              </Text>
              <Image source={jilta} />
              <Svg className="w-20 h-10">
                <SvgText
                  fill="white"
                  stroke="black"
                  fontSize="24"
                  fontFamily="Pretendard-ExtraBold"
                  x={40}
                  y={30}
                  textAnchor="middle"
                >
                  {rankingList?.myRanking?.nickname}
                </SvgText>
              </Svg>
              <View className="relative right-[-40px] flex flex-row justify-center items-center rounded-[20px] w-fit bg-white box-border h-8 text-center text-black border-[2px] border-solid border-black">
                <Text className="text-white w-10 rounded-l-[20px] h-full bg-black text-center text-[18px] font-PretendardMedium">
                  Lv
                </Text>
                <Text className="text-black text-[18px] font-PretendardBold px-2 w-12 text-center">
                  {rankingList?.myRanking?.level}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
