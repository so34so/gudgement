import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import Config from "react-native-config";
import { CommonType } from "../types/CommonType";

export default function PlayGameFinalResult({
  roomNumber,
  rounds,
  result,
  cardInfo,
  nickName,
  myCharacter,
  sendHandler,
  setNowGameComponent,
}) {
  // 가비지 컬렉션 방지를 위한 스테이트 변환처리
  const [myInfoState, setMyInfoState] = useState([null]);
  const [myCharacterState, setMyCharacterState] = useState(null);
  const [resultViewState, setResultViewState] = useState(null);

  const victoryPing = "pingpingeeewin.png";
  const victorydBam = "bambamwin.png";
  const losePing = "pingpingeeelose.png";
  const loseBam = "bambamlose.png";
  const victoryView = "victoryview.png";
  const loseView = "loseview.png";

  useEffect(() => {
    // 승패 여부에 따른 출력 이미지 변경
    if (myCharacter) {
      if (!result && myCharacter === "bambam.gif") {
        setMyCharacterState(loseBam);
        setResultViewState(loseView);
      } else if (!result && myCharacter === "pingpingeee.gif") {
        setMyCharacterState(losePing);
        setResultViewState(loseView);
      } else if (result && myCharacter === "bambam.gif") {
        setMyCharacterState(victorydBam);
        setResultViewState(victoryView);
      } else if (result && myCharacter === "pingpingeee.gif") {
        setMyCharacterState(victoryPing);
        setResultViewState(victoryView);
      }
    }
  }, [result]);

  // 라운드 데이터 요청
  async function postBettingInfo() {
    try {
      const response = await axios.post(`${Config.API_URL}/game/end`, {
        roomNumber: roomNumber,
        nickName: nickName,
        result: result,
      });
      console.log("최종 게임 저장완료!", response.data);
      setNowGameComponent("PlaySelect");
    } catch (error) {
      setNowGameComponent("PlaySelect");

      return undefined; // 에러 시 undefined를 반환하거나 다른 오류 처리 방식을 선택하세요.
    }
  }
  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={{
          uri: `${Config.IMAGE_URL}/game/${resultViewState}`,
        }}
        resizeMode="cover"
        className="flex-1"
      >
        <Text>+300</Text>
        <Image
          style={styles.mycharacter}
          source={{
            uri: `${Config.IMAGE_URL}/character/${myCharacterState}`,
          }}
        />
        <TouchableOpacity className="t-[30]" onPress={postBettingInfo}>
          <Image
            style={styles.exitbutton}
            source={{
              uri: `${Config.IMAGE_URL}/game/gameexit.png`,
            }}
          />
        </TouchableOpacity>
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
  mycharacter: {
    position: "absolute",
    width: 240,
    height: 200,
    top: "50%",
    right: "25%",
    zIndex: 10,
  },
  loadingtext: {
    position: "absolute",
    top: "40%",
    right: "10%",
  },
  exitbutton: {
    position: "absolute",
    width: 194,
    height: 69,
    top: 700,
    right: "26.5%",
    zIndex: 10,
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
    bottom: "89%",
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
