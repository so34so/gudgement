import { View, Text, Image } from "react-native";
import { screenWidth } from "../utils/common";
import Config from "react-native-config";
interface PointHeaderProps {
  tiggle: number | undefined;
  level: number | undefined;
}

function PointHeader({ tiggle, level }: PointHeaderProps) {
  return (
    <View
      className="pt-4 pb-2 z-10 flex flex-row justify-center items-center h-fit bg-transparent"
      style={{
        width: screenWidth * 0.25,
      }}
    >
      <Text className="text-buy text-[20px] px-3 py-1 text-center bg-black font-PretendardExtraBold border-[3px] border-black rounded-l-[6px]">
        티끌
      </Text>
      <View className="flex flex-row items-center justify-center space-x-2 w-36 bg-white border-[3px] h-[42.5px] border-black">
        <Image
          source={{
            uri: `${Config.IMAGE_URL}/asset/tiggleIcon.png`,
          }}
          className="h-8 w-8"
        />
        <Text className="text-black text-sm p-1 font-PretendardExtraBold ">
          {tiggle ? tiggle.toLocaleString("ko-KR") : 0}
        </Text>
      </View>
      <Text className="bg-black px-3 py-1 text-buy text-center font-PretendardExtraBold text-[20px] border-[3px] border-black">
        레벨
      </Text>
      <View className="flex flex-row items-center justify-center w-24 bg-white border-[3px] h-[42.5px] border-black rounded-r-[6px]">
        <Image
          source={{
            uri: `${Config.IMAGE_URL}/asset/levelIcon.png`,
          }}
          className="w-10 h-10 left-1"
        />
        <Text className="text-black text-sm pr-3 font-PretendardExtraBold ">
          {level}
        </Text>
      </View>
    </View>
  );
}

export default PointHeader;
