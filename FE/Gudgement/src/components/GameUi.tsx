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
import GameUI from "../assets/images/gameui.png";
import { CommonType } from "../types/CommonType";

function GameUi() {
  const gameUi: ImageSourcePropType = GameUI as ImageSourcePropType;
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
      <ImageBackground source={gameUi} resizeMode="cover" className="flex-1">
        <View className="flex-1">
          {/* <Animated.View style={[animatedStyles]}>
            <Image
              className="justify-center top-[150] flex-2 h-[350] w-[450]"
              source={flameEntrance} // 로컬 이미지 불러오는 방법
            />
          </Animated.View> */}
        </View>
      </ImageBackground>
    </View>
  );
}

export default GameUi;
