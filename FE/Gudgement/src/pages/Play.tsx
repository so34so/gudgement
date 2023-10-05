import { useEffect } from "react";
import {
  ImageBackground,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import PlayBackground from "../assets/images/playBackground.png";
import Fin from "../assets/images/finfinee.png";
import { CommonType } from "../types/CommonType";
import Config from "react-native-config";
import PlayNavigator from "../navigation/PlayNavigator";
import Reactotron from "reactotron-react-native";
import fetchApi from "../utils/tokenUtils";
function Play() {
  const playBackground: ImageSourcePropType =
    PlayBackground as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const fin: ImageSourcePropType = Fin as ImageSourcePropType;
  const offset = useSharedValue(5);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 300 }),
      -1,
      true,
    );
  }, [offset]);

  // 등급 결정 함수
  const postGrade = async () => {
    try {
      const response = await fetchApi.put(
        `${Config.API_URL}/member/update/grade`,
      );
      if (response.status === 200) {
        navigation.navigate("PlayNavigator");
      }
    } catch (error) {
      Reactotron.log!("매칭찾기실패!", error);
    }
  };

  return (
    <View className=" flex w-full h-full">
      <ImageBackground
        source={playBackground}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex-1">
          <Animated.View style={[animatedStyles]}>
            <Image
              className="justify-center top-[150] flex-2 h-[350] w-[450]"
              source={{
                uri: `${Config.IMAGE_URL}/asset/flame.gif`,
              }}
            />
          </Animated.View>

          {/* 실제 불의 선택 영역 */}
          <Pressable
            className="flex-1 absolute left-[35%] top-[30%] w-[150] h-[150]"
            onPress={() => postGrade()}
          />
          <Image
            className=" "
            style={{
              position: "absolute",
              bottom: 200,
              right: 0,
              width: 200,
              height: 200,
            }}
            source={fin}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default Play;
