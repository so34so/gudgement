import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { Text, Pressable, View } from "react-native";
import Svg, { LinearGradient, Stop, Defs, Ellipse } from "react-native-svg";

function NavigationButton({
  screenName,
  text,
}: {
  screenName: keyof CommonType.RootStackParamList;
  text: string;
}) {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  return (
    <View>
      <View>
        <Svg height="150" width="300">
          <Defs>
            <LinearGradient id="grad" x1="50%" y1="50%" x2="50%" y2="0%">
              <Stop offset="0" stopColor="#FFD080" stopOpacity="1" />
              <Stop offset="1" stopColor="red" stopOpacity="1" />
            </LinearGradient>
          </Defs>
        </Svg>
        <Svg height="150" width="300">
          <Ellipse cx="150" cy="75" rx="85" ry="55" fill="url(#grad)" />
        </Svg>
      </View>
      <Pressable
        className="h-fill w-[160px] py-1 flex flex-row justify-center items-center bg-lightsky border-solid border-[3px] border-white70 rounded-lg"
        onPress={() => navigation.navigate(screenName)}
      >
        <Svg height="100%" width="100%">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="100%" y2="0">
              <Stop offset="0" stopColor="rgb(76,209,149)" />
              <Stop offset="1" stopColor="#FF6F61" />
            </LinearGradient>
          </Defs>

          <View className="h-fill w-[150px] py-1 flex flex-row justify-center items-center bg-transparent border-solid border-[3px] border-white20 rounded-lg">
            <Text
              style={{
                textShadowColor: "rgba(0, 0, 0, 0.5)", // 그림자의 색상과 투명도
                textShadowOffset: { width: 2, height: 2 }, // 그림자의 위치 조정
                textShadowRadius: 5, // 그림자의 블러 정도
              }}
              className="text-center text-white text-md font-PretendardExtraBold"
              numberOfLines={1}
            >
              {text}
            </Text>
          </View>
        </Svg>
      </Pressable>
    </View>
  );
}

export default NavigationButton;
