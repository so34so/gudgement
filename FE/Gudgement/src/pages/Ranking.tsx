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

import RankingBackground from "../assets/images/rankingBackground.png";
import Jilta from "../assets/images/jilta.png";

interface Irank {
  rank: number;
  name: string;
  image: ImageSourcePropType;
}
const RANKING = Array.from({ length: 10 }, (_, i) => {
  return { rank: i, name: `player${i}`, image: Jilta as ImageSourcePropType };
});

export default function Ranking() {
  const jilta: ImageSourcePropType = Jilta as ImageSourcePropType;
  const rankingBackground: ImageSourcePropType =
    RankingBackground as ImageSourcePropType;
  const flatListProps: FlatListProps<Irank> = {
    data: RANKING.slice(3, RANKING.length),
    renderItem: ({ item }) => {
      return (
        <View className="flex flex-col px-5 py-3">
          <View
            key={item.rank}
            className="bg-white w-full flex-row h-20 space-y-5 justify-start items-center rounded-[10px]"
          >
            <Text className="ml-5 font-PretendardExtraBold text-[30px]">
              {item.rank}
            </Text>
          </View>
        </View>
      );
    },
  };
  return (
    <SafeAreaView>
      <ImageBackground
        source={rankingBackground}
        resizeMode="cover"
        className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
      />
      <View className="bg-pink w-full h-full bg-transparent">
        <View className="flex flex-row w-full justify-center space-x-10 mt-10 p-10">
          {RANKING.slice(0, 3).map((ele: Irank) => (
            <View
              key={ele.rank}
              className="bg-main w-20 h-20 justify-center items-center rounded-[10px]"
            >
              <Image source={jilta} />
            </View>
          ))}
        </View>
        <View className="h-[48%]">
          <FlatList {...flatListProps} />
        </View>
        <View className="w-full h-20 mt-8 ">
          <Text>asd</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
