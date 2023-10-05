import React, { useState, useEffect } from "react";
import Bettingmachine from "../assets/images/bettingmachine.png";
import Bettingsawtooth from "../assets/images/bettingsawtooth.png";
import GiveUpButton from "../assets/images/giveup.png";
import BettingButton from "../assets/images/betting.png";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
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
import { useWebSocket } from "../components/WebSocketContext";
import Config from "react-native-config";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";

const giveUpButton: ImageSourcePropType = GiveUpButton as ImageSourcePropType;
const bettingButton: ImageSourcePropType = BettingButton as ImageSourcePropType;

const BettingMachine = ({
  sendHandler,
  maxBettingAmount,
  roundInfo,
  nickName,
  otherName,
  roomNumber,
  setNowGameComponent,
  setRoundResult,
  roundResult,
}: {
  sendHandler: any;
  maxBettingAmount: number;
  roundInfo: object;
  nickName: string;
  otherName: string;
  roomNumber: string;
  setNowGameComponent: any;
  setRoundResult: any;
  roundResult: object;
}) => {
  // 버튼 활성화 상태 변수 추가
  const [isButtonActive, setIsButtonActive] = useState(true);
  const websocketClient = useWebSocket();

  useEffect(() => {
    const subscription = websocketClient?.subscribe(
      "/topic/game/" + roomNumber + nickName,
      function (messageOutput) {
        const newRoundResult = JSON.parse(messageOutput.body);
        setRoundResult(newRoundResult);

        if (newRoundResult.rounds >= 1 && newRoundResult.rounds <= 9) {
          setNowGameComponent("PlayGameResult");
        } else if (newRoundResult.rounds === 10) {
          setNowGameComponent("PlayGameFinalResult");
        }

        console.log("라운드 결과", newRoundResult);
      },
    );

    const timeoutSubscription = websocketClient?.subscribe(
      "/topic/game/round/timeout" + roomNumber,
      function (messageOutput) {
        if (messageOutput) {
          isGiveup();
        }
      },
    );

    return () => {
      subscription.unsubscribe();
      timeoutSubscription.unsubscribe();
    };
  }, [websocketClient]);

  // 베팅 정보 전송

  const postBettingInfo = () => {
    const bettingPayload = {
      nickName: nickName,
      otherName: otherName,
      bettingAmount: bettingAmount,
      rounds: roundInfo.rounds,
      cardOrder: roundInfo.card.order,
      roomNumber: roomNumber,
    };
    sendHandler("/app/game/playRound", bettingPayload, () => {});
    setIsButtonActive(false);
  };

  const postGiveup = () => {
    const giveUpPayload = {
      nickName: nickName,
      otherName: otherName,
      bettingAmount: bettingAmount,
      rounds: roundInfo.rounds,
      cardOrder: roundInfo.card.order,
      roomNumber: roomNumber,
    };
    sendHandler("/app/game/giveUpRound", giveUpPayload, () => {});
    setIsButtonActive(false);
  };
  // 베팅 포기 여부 확인

  const isGiveup = () => {
    const isGiveUpPayload = {
      nickName: nickName,
      otherName: otherName,
      bettingAmount: bettingAmount,
      rounds: roundInfo.rounds,
      cardOrder: roundInfo.card.order,
      roomNumber: roomNumber,
    };
    sendHandler("/app/game/timeoutGiveUp", isGiveUpPayload, () => {});
    setIsButtonActive(false);
  };

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

      // 움직일 때마다 1씩 변하도록 변경
      let newBettingAmount = Math.floor(newYCoord / 6); // Math.round 대신 Math.floor 사용

      // 베팅 가능한 최대량으로 제한합니다.
      newBettingAmount = Math.max(
        0,
        Math.min(newBettingAmount, maxBettingAmount),
      );

      runOnJS(setBettingAmount)(newBettingAmount);
    },
    onEnd: () => {},
  });

  const translateY = useSharedValue(0);
  translateY.value = bettingAmount * 0.06; // translateY 값을 베팅 숫자에 연동

  const animatedMachineStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    };
  });

  return (
    <View>
      {/* isButtonActive 값에 따라 전체 영역을 조건부로 렌더링 */}
      {isButtonActive ? (
        <View className="items-center" style={styles.bettingMachine}>
          <View style={styles.machineContainer}>
            <Image source={bettingMachine} style={styles.machineImage} />
            <PanGestureHandler onGestureEvent={onGestureEvent}>
              <Animated.View
                style={[styles.bettingSawtooth, animatedMachineStyle]}
              >
                <Image source={bettingSawtooth} style={styles.sawtoothImage} />
              </Animated.View>
            </PanGestureHandler>
          </View>
          <Text
            className="rounded-lg text-white text-[28px] font-PretendardExtraBold"
            style={styles.bettingAmountText}
          >
            {Math.round(bettingAmount)}개
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={postBettingInfo}>
              <Image className="w-[94] h-[41]" source={bettingButton} />
            </TouchableOpacity>
            <TouchableOpacity onPress={postGiveup}>
              <Image className="w-[94] h-[41]" source={giveUpButton} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="items-center" style={styles.bettingMachine}>
          <Text
            className="rounded-lg text-white text-[28px] font-PretendardExtraBold"
            style={styles.bettingwaittext}
          >
            상대방의 베팅을 기다리는 중...
          </Text>
        </View>
      )}
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
  bettingwaittext: {
    width: 500,
    height: 500,
    bottom: 52,
    right: "-70%",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
});

export default BettingMachine;
