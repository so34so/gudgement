import EnemyCard from "../assets/images/enemycard.png";
import BettingMachine from "../components/BettingMachine";
import { useEffect, useState } from "react";
import { CommonType } from "../types/CommonType";
import {
  Image,
  ImageSourcePropType,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { queryClient } from "../../queryClient";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const enemyCard: ImageSourcePropType = EnemyCard as ImageSourcePropType;

export default function GameBettingSyetem({
  roundInfo,
  roomNumber,
  nickName,
  enemyInfoState,
  setNowGameComponent,
  myInfoState,
  setRoundResult,
  roundResult,
  sendHandler,
}: {
  roundInfo: object;
  roomNumber: string;
  nickName: string;
  enemyInfoState: object;
  setNowGameComponent: any;
  myInfoState: object;
  setRoundResult: any;
  roundResult: object;
  sendHandler: any;
}) {
  // 가비지 컬렉션 방지를 위한 스테이트 변환처리

  const enemyCards = roundInfo?.card;
  return (
    <View style={styles.bettingwrapper}>
      <Text
        className="rounded-lg text-white text-[60px] font-PretendardBold"
        style={styles.enemycardnumber}
      >
        {enemyCards.order}
      </Text>
      <View style={styles.bettingcardwrapper}>
        <View style={styles.enemycardtext}>
          <Text
            className="rounded-lg  text-center text-white text-[24px] font-PretendardBold"
            style={styles.enemycardtitle}
          >
            {enemyCards.name}
          </Text>
          <Text
            className="rounded-lg  text-center text-white text-[20px] font-PretendardBold"
            style={styles.enemycardtitle}
          >
            {enemyCards.amount}
          </Text>
        </View>
      </View>
      <View style={styles.cardwrapper}>
        <Image style={styles.enemycard} source={enemyCard} />
        <BettingMachine
          sendHandler={sendHandler}
          roomNumber={roomNumber}
          otherName={enemyInfoState?.nickname}
          setNowGameComponent={setNowGameComponent}
          roundInfo={roundInfo}
          nickName={myInfoState?.nickname}
          maxBettingAmount={myInfoState?.tiggle / 10}
          setRoundResult={setRoundResult}
          roundResult={roundResult}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bettingwrapper: {
    flex: 1,
    position: "absolute",
    top: "30%",
    left: "43%",
  },
  buttonwrapper: {
    flex: 1,
    top: "60%",
    left: "50.5%",
  },
  cardwrapper: {
    flex: 1,
    top: "30%",
  },
  bettingcardwrapper: {
    position: "absolute",
    width: 500,
    left: -30,
    top: 10,
    height: 200,
  },
  infomessage: {
    bottom: "100%",
    zIndex: 20,
  },
  enemycard: {
    right: "25%",
  },
  enemycardnumber: {
    zIndex: 6,
    position: "absolute",
    left: -55,
    top: 60,
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 3, height: 3 }, // 섀도우 오프셋
    textShadowRadius: 9, // 섀도우 반경 (두께)
  },
  enemycardtext: {
    zIndex: 5,
    top: 120,
    right: "13%",
    width: "50%",
    height: "30%",
    alignItems: "center",
  },
  enemycardtitle: {
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 5, // 섀도우 반경 (두께)
  },
  mycharacter: {
    position: "absolute",
    width: 92,
    height: 67,
    top: "80%",
    right: "30%",
    bottom: 100,
    zIndex: 10,
  },
  loadingtext: {
    position: "absolute",
    top: "40%",
    right: "10%",
  },
  loadingtextkr: {
    position: "absolute",
    top: "48%",
    right: "12.5%",
  },
  enemy: {
    position: "absolute",
    width: 79,
    height: 79,
    bottom: "88%",
    right: "40%",

    zIndex: 10,
  },
  bluecard: {
    flex: 1,
    top: 140,
    position: "absolute",
    justifyContent: "center",
    width: 306,
    height: 343,
    right: 0,
    left: "13%",
  },
  queuebox: {
    flex: 1,
    bottom: 140,
    position: "absolute",
    justifyContent: "center",
    width: 180,
    height: 66,
    alignItems: "center",
    left: "20%",
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
