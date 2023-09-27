// import { CommonType } from "../types/CommonType";
import { Text, Pressable, View } from "react-native";

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
      currentWidth === "lg" ? "px-[162px]" : "px-2"
    } h-fill w-fill flex flex-row justify-center items-center bg-transparent border-solid border-[3px] border-white20 rounded-lg`;

  const buttonStyle03 = (currentSize: string) =>
    `text-center text-white ${
      currentSize === "md" ? "text-md" : "text-sm"
    } font-PretendardExtraBold`;

  return (
    // <View>
    <Pressable className={buttonStyle01(color)} onPress={handleFunction}>
      <View className={buttonStyle02(height, width)}>
        <Text
          style={{
            textShadowColor: "rgba(0, 0, 0, 0.5)", // 그림자의 색상과 투명도
            textShadowOffset: { width: 2, height: 2 }, // 그림자의 위치 조정
            textShadowRadius: 5, // 그림자의 블러 정도
          }}
          className={buttonStyle03(size)}
          numberOfLines={1}
        >
          {text}
        </Text>
      </View>
    </Pressable>
    // </View>
  );
}

export default NavigationButton;
