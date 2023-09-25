import { View, Text, Image, ImageSourcePropType } from "react-native";
import Tiggle from "../assets/icons/tiggle.png";
import Level from "../assets/icons/level.png";
import { screenWidth } from "../utils/common";
function PointHeader() {
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
          source={Tiggle as ImageSourcePropType}
          className="w-6 h-6 left-3"
        />
        <Text className="text-black text-[18px] px-4 py-1 font-PretendardExtraBold">
          182,300
        </Text>
      </View>
      <Text className="bg-black px-3 py-1 text-buy text-center font-PretendardExtraBold text-[20px] border-[3px] border-black">
        레벨
      </Text>
      <View className="flex flex-row items-center justify-center w-24 bg-white border-[3px] h-[42.5px] border-black rounded-r-[6px]">
        <Image
          source={Level as ImageSourcePropType}
          className="w-10 h-10 left-1"
        />
        <Text className="px-3 py-1 text-black font-PretendardExtraBold text-[16px] rounded-r-[6px]">
          232
        </Text>
      </View>
    </View>
  );
}

export default PointHeader;
