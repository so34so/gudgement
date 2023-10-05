import BluePlayBackground from "../assets/images/blueplaybackground.png";
import BlueFin from "../assets/images/bluefin.png";
import BlueBlur from "../assets/images/blueblur.png";
import FlameMatch from "../assets/images/flamematch2.gif";
import SmallCloseButton from "../components/SmallCloseButton";
import BlueFlame from "../assets/images/blueflame.gif";
import MathchingTimer from "./MathchingTimer";
import MatchingInfoBox from "../assets/images/matchingInfoBox.png";
import React, { useEffect, useRef, useState } from "react";
import "../../globals.js";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
} from "react-native";

import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function PlayMatchingWait({
  userData,
  selectedTiggle,
  sendHandler,
}) {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const bluePlayBackground: ImageSourcePropType =
    BluePlayBackground as ImageSourcePropType;
  const blueBlur: ImageSourcePropType = BlueBlur as ImageSourcePropType;
  const blueFin: ImageSourcePropType = BlueFin as ImageSourcePropType;
  const blueFlame: ImageSourcePropType = BlueFlame as ImageSourcePropType;
  const flameMatch: ImageSourcePropType = FlameMatch as ImageSourcePropType;
  const matchInfobox: ImageSourcePropType =
    MatchingInfoBox as ImageSourcePropType;
  const offset = useSharedValue(5);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const handleSend = () => {
    const matchPayload = {
      nickName: userData.nickname,
      grade: userData.grade,
      tiggle: selectedTiggle,
    };
    sendHandler("/app/match/removeUser", matchPayload, () =>
      setNowGameComponent("PlaySelect"),
    );
  };
  // memberId: memberId,
  // nickName: nickName,
  // grade: grade,
  // tiggle: tiggle,
  // timestamp: timestamp,

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
          <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
              navigation.navigate("플레이");
            }}
          >
            <SmallCloseButton />
          </TouchableOpacity>
        </View>
        <View style={styles.matchInfobox}>
          <MathchingTimer />
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
