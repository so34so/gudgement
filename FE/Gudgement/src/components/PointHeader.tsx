import { View, Text, Image } from "react-native";
import { IMAGE_URL } from "@env";

interface PointHeaderProps {
  tiggle: number | undefined;
  level: number | undefined;
}

function PointHeader({ tiggle, level }: PointHeaderProps) {
  return (
    <View className="z-10 flex flex-row justify-center items-center w-fit h-fit bg-transparent">
      <View className="flex justify-center items-center bg-black border-black border-[3px] rounded-l-xl">
        <Text className="text-buy text-md px-3 py-1 font-PretendardExtraBold ">
          티끌
        </Text>
      </View>
      <View className="flex flex-row justify-center w-[170px] h-full items-center bg-white border-black border-[3px]">
        <Image
          source={{
            uri: `${IMAGE_URL}/asset/tiggleIcon.png`,
          }}
          className="h-8 w-8"
        />
        <Text className="text-black text-sm p-1 font-PretendardExtraBold ">
          {tiggle ? tiggle.toLocaleString("ko-KR") : 0}
        </Text>
      </View>
      <View className="flex justify-center items-center bg-black border-black border-[3px]">
        <Text className="text-buy text-md px-3 py-1 font-PretendardExtraBold ">
          레벨
        </Text>
      </View>
      <View className="flex flex-row justify-center items-center w-[80px] h-full bg-white border-black border-[3px] rounded-r-xl">
        <Image
          source={{
            uri: `${IMAGE_URL}/asset/levelIcon.png`,
          }}
          className="h-9 w-9"
        />
        <Text className="text-black text-sm pr-3 font-PretendardExtraBold ">
          {level}
        </Text>
      </View>
    </View>
  );
}

export default PointHeader;
