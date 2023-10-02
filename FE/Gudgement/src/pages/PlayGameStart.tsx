import VolcanoMap from "../assets/images/volcanomap.png";
import Snake from "../assets/images/snake.png";
import PingPing from "../assets/images/pingping.png";
import { RouteProp } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { WEBSOCKET_URL } from "@env";
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
import { useQueryClient } from "react-query";
import { IMAGE_URL } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { useQuery } from "react-query";
import Reactotron from "reactotron-react-native";
import { useWebSocket } from "../components/WebSocketContext";

type PlayGameStartRouteProp = RouteProp<
  CommonType.RootStackParamList,
  "PlayGameStart"
>;

export default function PlayGameStart({
  route,
}: {
  route: PlayGameStartRouteProp;
}) {
  // WebSocket connection

  const { roomNumber } = route.params; // 추가
  const websocketClient = useWebSocket();

  // const queryClient = useQueryClient();
  useEffect(() => {
    websocketClient.connect({}, function (frame) {
      websocketClient.subscribe(
        "/topic/game/" + roomNumber,
        function (messageOutput) {
          console.log("이거뭐냐?", messageOutput);
          Reactotron.log!("정보들:", messageOutput);

          const userInfoDtos = JSON.parse(
            messageOutput.body,
          ) as CommonType.TGameUserInfoDto;
          const myInfo = userInfoDtos[1] as CommonType.TenemyGameinfo;
          const enemyInfo = userInfoDtos[0] as CommonType.TenemyGameinfo; // Cast to the correct type
          Reactotron.log!("내 정보:", myInfo);
          Reactotron.log!("적 정보", enemyInfo);
        },
      );
    });

    return () => {
      // Clean up on unmount
      if (websocketClient.connected) {
        websocketClient.disconnect();
      }
    };
  }, []);

  // websocketClient.connect({}, function (frame) {
  //   websocketClient.subscribe("/topic/game/" + roomNumber, function (massage) {
  //     console.log(massage.body);
  //     const userInfoDtos = JSON.parse(
  //       massage.body,
  //     ) as CommonType.TGameUserInfoDto;
  //     const myInfo = userInfoDtos[1] as CommonType.TenemyGameinfo;
  //     const enemyInfo = userInfoDtos[0] as CommonType.TenemyGameinfo; // Cast to the correct type
  //     console.log("내 정보:", myInfo);
  //     console.log("적 정보", enemyInfo);
  //     Reactotron.log!("dddd");
  //     Reactotron.log!("내 정보:", myInfo);
  //     Reactotron.log!("적 정보", enemyInfo);

  //     // queryClient.setQueryData("myGameinfo", myInfo);
  //     // queryClient.setQueryData("enemyGameinfo", enemyInfo);
  //   });
  // });

  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  // const { data: enemyInfo } =
  //   useQuery<CommonType.TenemyGameinfo>("enemyGameinfo");
  // const enemyImage = enemyInfo?.equippedItems.items.find(
  //   item => item.typeId === null,
  // )?.image;
  // const { data: myInfo } = useQuery<CommonType.TenemyGameinfo>("myGameinfo");
  // const myImage = myInfo?.equippedItems.items.find(
  //   item => item.typeId === null,
  // )?.image;
  const volcanoMap: ImageSourcePropType = VolcanoMap as ImageSourcePropType;
  const pingping: ImageSourcePropType = PingPing as ImageSourcePropType;
  const snake: ImageSourcePropType = Snake as ImageSourcePropType;

  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={volcanoMap}
        resizeMode="cover"
        className="flex-1"
      >
        <GameUi />

        <GameBettingSyetem />
        {/* <Text
          className="py-1 pl-3 pr-2 rounded-lg text-white text-[52px] font-PretendardExtraBold"
          style={styles.loadingtext}
        >
          Now Loading
        </Text>
        <Text
          className="py-1 pl-3 pr-2 rounded-lg text-white text-[28px] font-Pretendard"
          style={styles.loadingtextkr}
        >
          잠시후 게임이 시작됩니다
        </Text> */}

        {/* <Image
          style={styles.mycharacter}
          source={{ uri: `${IMAGE_URL}/character/${myImage}` }}
        />
        <Image
          style={styles.enemy}
          source={{ uri: `${IMAGE_URL}/character/${enemyImage}` }}
        /> */}
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
