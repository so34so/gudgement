import { View, Text } from "react-native";

function PointHeader() {
  return (
    <View className="top-4 z-10 flex flex-row justify-center items-center w-fit h-fit bg-transparent">
      <Text className="text-buy text-[22px] px-5 py-1 text-center bg-black font-PretendardExtraBold border-[3px] border-black rounded-l-[6px]">
        티끌
      </Text>
      <Text className="bg-white text-black text-[22px] px-5 py-1 font-PretendardExtraBold border-[3px] border-black">
        182,300
      </Text>
      <Text className="bg-black px-5 py-1 text-buy text-center font-PretendardExtraBold text-[22px] border-[3px] border-black">
        보석
      </Text>
      <Text className="bg-white px-5 py-1 text-black font-PretendardExtraBold text-[22px] border-[3px] border-black rounded-r-[6px]">
        232
      </Text>
    </View>
  );
}

export default PointHeader;
