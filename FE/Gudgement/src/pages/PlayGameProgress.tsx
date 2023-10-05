import VolcanoMap from "../assets/images/volcanomap.png";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useFocusEffect, useRef, useState } from "react";
import axios from "axios";
import GameUi from "../components/GameUi";
import GameTimerBar from "../components/GameTimerBar";
import GameBettingSyetem from "../components/GameBettingSyetem";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  ImageSourcePropType,
  StatusBar,
} from "react-native";
import { CommonType } from "../types/CommonType";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import Reactotron from "reactotron-react-native";
import { queryClient } from "../../queryClient";
import Config from "react-native-config";

type PlayGameStartRouteProp = RouteProp<
  CommonType.RootStackParamList,
  "PlayGameStart"
>;

export default function PlayGameProgress({
  route,
}: {
  route: PlayGameStartRouteProp;
}) {
  const { roomNumber, nickName } = route.params; // 추가
  const [roundInfo, setRoundInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [myCharacterState, setMyCharacterState] = useState(null);
  const [enemyCharacterState, setEnemyCharacterState] = useState(null);
  // 가비지 컬렉션 방지를 위한 스테이트 변환처리
  const [enemyInfoState, setEnemyInfoState] = useState(null);
  const [myInfoState, setMyInfoState] = useState(null);

  // 라운드 데이터 요청
  async function postRoundStart() {
    try {
      const response = await axios.post(
        `${Config.API_URL}/game/gameroundinfo`,
        {
          roomNumber: roomNumber,
          nickName: nickName,
        },
      );
      Reactotron.log!("라운드시작!", response.data);
      setRoundInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      Reactotron.log!(error);
      return undefined; // 에러 시 undefined를 반환하거나 다른 오류 처리 방식을 선택하세요.
    }
  }

  useEffect(() => {
    const myCharacter = queryClient.getQueryData(["myCharacter"]);
    const enemyCharacter = queryClient.getQueryData(["enemyCharacter"]);
    const enemyData = queryClient.getQueryData(["enemyGameinfo"]);
    const myData = queryClient.getQueryData(["myGameinfo"]);

    if (enemyData) {
      setEnemyInfoState(enemyData);
    }

    if (myData) {
      setMyInfoState(myData);
    }
    if (myCharacter) {
      setMyCharacterState(myCharacter);
    }

    if (enemyCharacter) {
      setEnemyCharacterState(enemyCharacter);
    }
    postRoundStart();
  }, []); // 의존성 배열은 필요에 따라 적절하게 설정하세요.

  const volcanoMap: ImageSourcePropType = VolcanoMap as ImageSourcePropType;

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={volcanoMap}
        resizeMode="cover"
        className="flex-1"
      >
        <GameTimerBar duration={10} />

        <GameUi
          myInfoState={myInfoState}
          roundInfo={roundInfo}
          enemyInfoState={enemyInfoState}
        />
        <GameBettingSyetem
          roundInfo={roundInfo}
          roomNumber={roomNumber}
          nickName={nickName}
          myInfoState={myInfoState}
          enemyInfoState={enemyInfoState}
        />
        <Image
          style={styles.mycharacter}
          source={{
            uri: `${Config.IMAGE_URL}/character/${myCharacterState}`,
          }}
        />
        <Image
          style={styles.enemy}
          source={{
            uri: `${Config.IMAGE_URL}/character/${enemyCharacterState}`,
          }}
        />
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
  buttonwrapper: {
    flex: 1,
    top: "60%",
    left: "50.5%",
  },
  infomessage: {
    bottom: "100%",
    zIndex: 20,
  },
  mycharacterbox: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "50%",
    left: "-123%",
    bottom: 100,
    zIndex: 12,
  },
  vs: {
    position: "absolute",
    width: 200,
    height: 148,
    top: "38%",
    left: "30%",
    zIndex: 15,
  },
  mycharacterboxinname: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "60%",
    left: "-118%",
    bottom: 100,
    zIndex: 13,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
  mycharacterboxinaward: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "56%",
    left: "-118%",
    bottom: 100,
    zIndex: 13,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
  boxinmycharacter: {
    position: "absolute",
    width: 120,
    height: 100,
    top: "55%",
    left: "-123%",
    bottom: 100,
    zIndex: 13,
  },
  enemybox: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "10%",
    right: "-123%",
    bottom: 100,
    zIndex: 12,
  },

  boxinenemy: {
    position: "absolute",
    width: 130,
    height: 130,
    top: "12%",
    right: "-123%",
    bottom: 100,
    zIndex: 13,
  },
  enemyboxinname: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "20%",
    right: "-115%",
    bottom: 100,
    zIndex: 13,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
  },
  enemyboxinaward: {
    position: "absolute",
    width: 329,
    height: 201,
    top: "16%",
    right: "-115%",
    bottom: 100,
    zIndex: 13,
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 8, // 섀도우 반경 (두께)
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
