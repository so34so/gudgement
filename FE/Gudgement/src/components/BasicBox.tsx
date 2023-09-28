import { Text, View } from "react-native";

interface BasicBoxProps {
  text: string;
}

function BasicBox({ text }: BasicBoxProps) {
  return (
    <View className="w-[150px] px-3 py-1 flex flex-row justify-center items-center bg-white border-solid border-[3px] rounded-lg border-darkgray">
      <Text className="text-black text-2xs font-PretendardExtraBold">
        {text}
      </Text>
    </View>
  );
}

export default BasicBox;
