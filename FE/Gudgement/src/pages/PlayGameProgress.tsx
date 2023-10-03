import VolcanoMap from "../assets/images/volcanomap.png";
import Snake from "../assets/images/snake.png";
import PingPing from "../assets/images/pingping.png";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import GameUi from "../components/GameUi";
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
import { IMAGE_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  runOnJS,
  withTiming,
} from "react-native-reanimated";

import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useQuery } from "react-query";
import Reactotron from "reactotron-react-native";
import { useWebSocket } from "../components/WebSocketContext";
import { queryClient } from "../../queryClient";

type PlayGameStartRouteProp = RouteProp<
  CommonType.RootStackParamList,
  "PlayGameStart"
>;

export default function PlayGameProgress({
  route,
}: {
  route: PlayGameStartRouteProp;
}) {
  const { roomNumber, nickName, myInfoState, enemyInfoState } = route.params; // 추가
  const myData = queryClient.getQueryData(["myGameinfo"]);
  const enemyData = queryClient.getQueryData(["enemyGameinfo"]);
  console.log("게임진행내정보", myInfoState.tiggle);
  const websocketClient = useWebSocket();
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [roundInfo, setRoundInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // 애니메이션 관련 변수
  const image1PositionX = useSharedValue(0);
  const image2PositionX = useSharedValue(0);
  const vsOpacity = useSharedValue(0);

  // 라운드 데이터 요청
  async function postRoundStart() {
    try {
      const response = await axios.post(`${API_URL}/game/gameroundinfo`, {
        roomNumber: roomNumber,
        nickName: nickName,
      });
      Reactotron.log!("라운드시작!", response.data);
      setRoundInfo(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      Reactotron.log!(error);
      return undefined; // 에러 시 undefined를 반환하거나 다른 오류 처리 방식을 선택하세요.
    }
  }

  // const queryClient = useQueryClient();
  useEffect(() => {
    postRoundStart();
  }, []); // 의존성 배열은 필요에 따라 적절하게 설정하세요.

  // useEffect(() => {
  //   StatusBar.setHidden(true);
  //   // 애니메이션 시작
  //   setTimeout(() => {
  //     image1PositionX.value = withTiming(-490, { duration: 3000 });
  //     vsOpacity.value = withTiming(1, { duration: 3000 });
  //     image2PositionX.value = withTiming(490, { duration: 3000 }, () => {
  //       runOnJS(setIsAnimationFinished)(true);
  //     });
  //   }, 100);

  //   // Navigate to another screen after animation finishes
  //   if (isAnimationFinished) {
  //     setTimeout(() => {
  //       navigation.navigate("PlayGameProgress", {
  //         roomNumber: roomNumber,
  //       });
  //     }, 50000);
  //   }
  // }, [isAnimationFinished]);

  const animatedEnemyStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: image1PositionX.value }],
  }));
  const animatedMyStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: image2PositionX.value }],
  }));
  const animatedVsStyle = useAnimatedStyle(() => ({
    opacity: vsOpacity.value,
  }));

  const volcanoMap: ImageSourcePropType = VolcanoMap as ImageSourcePropType;
  const pingping: ImageSourcePropType = PingPing as ImageSourcePropType;
  const snake: ImageSourcePropType = Snake as ImageSourcePropType;

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
        <GameUi />
        <GameBettingSyetem
          enemyInfoState={enemyInfoState}
          myInfoState={myInfoState}
          roundInfo={roundInfo}
          roomNumber={roomNumber}
        />

        <Animated.Image
          style={[styles.boxinmycharacter, animatedMyStyle]}
          source={pingping}
        />
        {/* 내 칭호 */}
        <Animated.Text
          className="py-1 pl-3 pr-2 rounded-lg text-center text-white text-[24px] font-PretendardBold"
          style={[styles.mycharacterboxinaward, animatedMyStyle]}
        >
          어어어어
        </Animated.Text>
        {/* 내 닉네임 */}
        <Animated.Text
          className="py-1 pl-3 pr-2 rounded-lg text-center text-white text-[36px] font-PretendardBold"
          style={[styles.mycharacterboxinname, animatedMyStyle]}
        >
          NICKNAME
        </Animated.Text>

        <Animated.Image
          style={[styles.boxinenemy, animatedEnemyStyle]}
          source={snake}
        />
        {/* 적 칭호 */}
        <Animated.Text
          className="py-1 pl-3 pr-2 rounded-lg text-center text-white text-[24px] font-PretendardBold"
          style={[styles.enemyboxinaward, animatedEnemyStyle]}
        >
          어어어어
        </Animated.Text>
        {/* 적 닉네임 */}
        <Animated.Text
          className="py-1 pl-3 pr-2 rounded-lg text-center text-white text-[36px] font-PretendardBold"
          style={[styles.enemyboxinname, animatedEnemyStyle]}
        >
          {enemyInfoState.nickname}
        </Animated.Text>
        <Image style={styles.mycharacter} source={pingping} />
        <Image style={styles.enemy} source={snake} />
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
