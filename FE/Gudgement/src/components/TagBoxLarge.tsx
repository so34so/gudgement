import { Text, View, Image, ImageSourcePropType } from "react-native";

interface TagBoxLargeProps {
  text01: string;
  text02: string;
  img: ImageSourcePropType;
}

function TagBoxLarge({ text01, text02, img }: TagBoxLargeProps) {
  return (
    <View className="flex flex-row relative m-3 items-center">
      <View className="z-10 p-[2px] bg-white70 border-solid border-[2px] border-darkgray rounded-full">
        <View className="bg-darkgray rounded-full">
          <Image source={img} className="h-10 w-10" />
        </View>
      </View>
      <View className="z-9 absolute ml-7 pl-2 pr-[2px] py-[2px] flex flex-row h-fill justify-center items-center bg-white70 border-solid border-[2px] rounded-lg border-darkgray">
        <Text className="py-1 pl-3 pr-2 bg-darkgray rounded-lg text-white text-xs font-PretendardExtraBold">
          {text01}
        </Text>
        <Text className="px-2 text-darkgray text-xs font-PretendardExtraBold">
          {text02}
        </Text>
      </View>
    </View>
  );
}

export default TagBoxLarge;
