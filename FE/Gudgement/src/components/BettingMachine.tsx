import React, { useState } from "react";
import Bettingmachine from "../assets/images/bettingmachine.png";
import Bettingsawtooth from "../assets/images/bettingsawtooth.png";
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
    <View className="items-center justify-center" style={styles.bettingMachine}>
      <View style={styles.machineContainer}>
        <Image source={bettingMachine} style={styles.machineImage} />
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View style={[styles.bettingSawtooth, animatedMachineStyle]}>
            <Image source={bettingSawtooth} style={styles.sawtoothImage} />
          </Animated.View>
        </PanGestureHandler>
      </View>
      <Text
        className="color-white text-[50px] font-PretendardSemiBold"
        style={styles.bettingAmountText}
      >
        {Math.round(bettingAmount * 60)} {/* 반올림하여 정수로 표시 */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bettingMachine: {
    position: "absolute",
    width: 110,
    height: 56,
    top: "30%",
    right: "35%",
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
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default BettingMachine;
