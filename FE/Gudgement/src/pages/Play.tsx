import { useCallback, useEffect, useState } from "react";
import FastImage, { FastImageProps } from "react-native-fast-image";
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
import FlameEntrance from "../assets/images/flame.gif";

import { CommonType } from "../types/CommonType";

function Play() {
  const playBackground: ImageSourcePropType =
    PlayBackground as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const flameEntrance: ImageSourcePropType =
    FlameEntrance as ImageSourcePropType;
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

  return (
    <View className=" flex w-full h-full">
      <ImageBackground
        source={playBackground}
        resizeMode="cover"
        className="flex-1"
      >
        <Image className="h-15 w-15" source={fin} width={100} height={100} />
        <View className="flex-1">
          <Animated.View style={[animatedStyles]}>
            <Pressable
              className=" justify-center items-center "
              onPress={() => navigation.navigate("PlaySelect")}
            >
              <Image
                className="flex-2 h-10 w-10"
                source={flameEntrance} // first way (local)
                width={100}
                height={100}
              />

              {/* <FastImage
                source={require("../assets/images/flame.gif")} // FlameEntrance gif 이미지 사용
                style={{ width: "100%", height: "100%" }} // 사이즈 조절은 필요에 따라 변경하세요.
                resizeMode={FastImage.resizeMode.contain} // resize mode 설정
              /> */}
            </Pressable>

            {/* <FastImage
                source={require("../assets/images/flame.gif")}
                source={FlameEntrance} // FlameEntrance gif 이미지 사용
                style={{ width: '100%', height: '100%' }} // 사이즈 조절은 필요에 따라 변경하세요.
                resizeMode={FastImage.resizeMode.contain} // resize mode 설정
              /> */}
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Play;
