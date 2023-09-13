import { Text, View, Image, ImageSourcePropType } from "react-native";

interface TagBoxSmallProps {
  text: string;
  img: ImageSourcePropType;
}

function TagBoxSmall({ text, img }: TagBoxSmallProps) {
  return (
    <View className="flex flex-row relative m-3 items-center">
      <View className="z-10 bg-lightsky border-solid border-[2px] border-darkgray rounded-full">
        <Image source={img} className="h-10 w-10" />
      </View>
      <View className="z-9 absolute ml-7 pl-3 pr-1 py-1 flex flex-row h-fill justify-center items-center bg-white70 border-solid border-[2px] rounded-lg border-darkgray">
        <Text className="px-2 text-darkgray text-xs font-PretendardExtraBold">
          {text}
        </Text>
      </View>
    </View>
  );
}

export default TagBoxSmall;
