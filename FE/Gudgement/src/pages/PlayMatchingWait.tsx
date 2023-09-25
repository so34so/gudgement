import BluePlayBackground from "../assets/images/blueplaybackground.png";
import BlueFin from "../assets/images/bluefin.png";
import BlueBlur from "../assets/images/blueblur.png";
import FlameMatch from "../assets/images/flamematch2.gif";
import SmallCloseButton from "../components/SmallCloseButton";
import BlueFlame from "../assets/images/blueflame.gif";
import MatchingInfoBox from "../assets/images/matchingInfoBox.png";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  Text,
  ImageSourcePropType,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

export default function PlayMatchingWait() {
  const bluePlayBackground: ImageSourcePropType =
    BluePlayBackground as ImageSourcePropType;
  const blueBlur: ImageSourcePropType = BlueBlur as ImageSourcePropType;
  const blueFin: ImageSourcePropType = BlueFin as ImageSourcePropType;
  const blueFlame: ImageSourcePropType = BlueFlame as ImageSourcePropType;
  const flameMatch: ImageSourcePropType = FlameMatch as ImageSourcePropType;

  const matchInfobox: ImageSourcePropType =
    MatchingInfoBox as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const offset = useSharedValue(5);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 300 }),
      -1,
      true,
    );
    const intervalId = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    // 컴포넌트가 언마운트될 때 clearInterval로 인터벌을 정리합니다.
    return () => {
      clearInterval(intervalId);
    };
  }, [offset]);
  // useEffect(() => {});
  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={bluePlayBackground}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="flex">
          <Animated.View style={[animatedStyles]}>
            <Image
              className="justify-center top-[150] flex-2 h-[350] w-[450]"
              source={blueFlame}
            />
          </Animated.View>
          <Image style={styles.blueBlur} source={blueBlur} />

          <Image style={styles.flamematch} source={flameMatch} />
        </View>

        <Image className=" " style={styles.bluFin} source={blueFin} />
        <View style={styles.closebutton}>
        <Pressable onPress={() => navigation.navigate("PlayMatchingQueue")}>
          <SmallCloseButton />
        </Pressable>
        </View>
        <View style={styles.matchInfobox}>
          <Text
            style={styles.elapsedTimeText}
            className="rounded-lg text-white text-[44px] font-PretendardExtraBold"
          >
            {formatElapsedTime(elapsedTime)}
          </Text>
          <Image style={styles.matchInfobox} source={matchInfobox} />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  blueBlur: {
    bottom: "15%",
    left: "13%",
  },
  numbertext: {
    top: "23%",
    zIndex: 9,
    left: "15%",
  },
  flamematch: {
    bottom: "50%",
    zIndex: 9,
    right: "35%",
  },
  matchInfobox: {
    top: "55%",
    flex: 1,
    position: "absolute",
    justifyContent: "center",
    width: 320,
    height: 192,
    alignItems: "center",
    right: 0,
    left: "6%",
  },
  bluFin: {
    position: "absolute",
    bottom: 200,
    right: 0,
    width: 200,
    height: 200,
  },
  elapsedTimeText: {
    top: "73%",
    zIndex: 9,
    left: "6%",
  },
  closebutton: {
    position: "absolute",
    width: "5%",
    height: "5%",
    right: "15%",
    top: "70%",
    zIndex: 13,
  },
});

// 경과 시간을 MM:SS 형식으로 포맷하는 함수
function formatElapsedTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
}

// 숫자를 두 자릿수로 맞춰줍니다 (0을 추가)
function padWithZero(number: number) {
  return number.toString().padStart(2, "0");
}
