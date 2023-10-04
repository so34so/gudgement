import { Text, Pressable, View } from "react-native";
import { textShadow } from "../utils/common";

function NavigationButton({
  handleFunction,
  text,
  height,
  width,
  size,
  color,
}: {
  handleFunction?: () => Promise<void>;
  text: string;
  height: string;
  width: string;
  size: string;
  color: string;
}) {
  const buttonStyle01 = (currentColor: string) =>
    `h-fill w-fill py-[1px] flex flex-row justify-center items-center ${
      currentColor === "bluesky" ? "bg-bluesky" : "bg-deepgreen"
    } border-solid border-[3px] border-white70 rounded-xl`;

  const buttonStyle02 = (currentHeight: string, currentWidth: string) =>
    `${currentHeight === "lg" ? "py-2" : "py-1"} ${
      currentWidth === "lg" && "px-[136px]"
    } ${currentWidth === "md" && "px-[114px]"} ${
      currentWidth === "sm" && "px-2"
    } h-fill w-fill flex flex-row justify-center items-center bg-transparent border-solid border-[3px] border-white20 rounded-lg`;

  const buttonStyle03 = (currentWidth: string, currentSize: string) =>
    `text-center text-white ${currentSize === "2xs" && "text-2xs"} ${
      currentSize === "sm" && "text-sm"
    } ${currentSize === "md" && "text-md "} ${
      currentWidth === "md" && "w-[100px]"
    } ${currentWidth === "lg" && "w-[100px]"} font-PretendardExtraBold`;

  return (
    <Pressable className={buttonStyle01(color)} onPress={handleFunction}>
      <View className={buttonStyle02(height, width)}>
        <Text
          style={textShadow}
          className={buttonStyle03(width, size)}
          numberOfLines={1}
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
}

export default NavigationButton;
