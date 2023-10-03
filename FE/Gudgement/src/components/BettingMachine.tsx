import React, { useState } from "react";
import Bettingmachine from "../assets/images/bettingmachine.png";
import Bettingsawtooth from "../assets/images/bettingsawtooth.png";
import GiveUpButton from "../assets/images/giveup.png";
import BettingButton from "../assets/images/betting.png";

import {
  View,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Text,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedGestureHandler,
  runOnJS,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
const giveUpButton: ImageSourcePropType = GiveUpButton as ImageSourcePropType;
const bettingButton: ImageSourcePropType = BettingButton as ImageSourcePropType;

const BettingMachine = () => {
  const bettingMachine: ImageSourcePropType =
    Bettingmachine as ImageSourcePropType;
  const bettingSawtooth: ImageSourcePropType =
    Bettingsawtooth as ImageSourcePropType;

  // 베팅 숫자 상태 변수
  const [bettingAmount, setBettingAmount] = useState(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = bettingAmount;
    },
    onActive: (
      event: { translationY: number },
      context: { startY: number },
    ) => {
      const newYCoord = context.startY + event.translationY;
      const newBettingAmount = Math.max(0, Math.min(newYCoord / 6, 1));
      runOnJS(setBettingAmount)(newBettingAmount);
    },
    onEnd: () => {},
  });

  const translateY = useSharedValue(0);
  translateY.value = bettingAmount * 6; // translateY 값을 베팅 숫자에 연동

  const animatedMachineStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    };
  });

  return (
    <View className="items-center" style={styles.bettingMachine}>
      <View style={styles.machineContainer}>
        <Image source={bettingMachine} style={styles.machineImage} />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.bettingSawtooth, animatedMachineStyle]}>
            <Image source={bettingSawtooth} style={styles.sawtoothImage} />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <Text
        className="rounded-lg text-white text-[28px] font-PretendardExtraBold"
        style={styles.bettingAmountText}
      >
        {Math.round(bettingAmount * 60)}개
      </Text>
      <View style={styles.buttonContainer}>
        <Image className="w-[94] h-[41]" source={bettingButton} />
        <Image className="w-[94] h-[41]" source={giveUpButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bettingMachine: {
    position: "relative",
    width: 110,
    height: 56,
    top: 10,
    right: "14%",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    bottom: 30,
  },
  machineContainer: {
    position: "relative",
  },
  machineImage: {
    width: 110,
    height: 56,
  },
  bettingSawtooth: {
    position: "absolute",
    top: 0,
    left: "78%",
    width: 20,
    height: 43,
  },
  sawtoothImage: {
    width: 20,
    height: 43,
  },
  bettingAmountText: {
    bottom: 52,
    right: 10,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
});

export default BettingMachine;
