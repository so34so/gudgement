import BluePlayBackground from "../assets/images/blueplaybackground.png";
import BlueFin from "../assets/images/bluefin.png";
import BlueCard from "../assets/images/bluecard.png";

import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  TouchableOpacity,
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
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { CommonType } from "../types/CommonType";
import { useWebSocket } from "../components/WebSocketContext";
import { useQueryClient } from "react-query";
import { useQuery } from "react-query";
import { queryClient } from "../../queryClient";
import Config from "react-native-config";

export default function PlayMatchingQueueWait({ route }) {
  const { roomNumber, nickName } = route.params; // 추가
  console.log("매칭웨이트", roomNumber);
  const websocketClient = useWebSocket();

  const bluePlayBackground: ImageSourcePropType =
    BluePlayBackground as ImageSourcePropType;
  const blueCard: ImageSourcePropType = BlueCard as ImageSourcePropType;
  const blueFin: ImageSourcePropType = BlueFin as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  useEffect(() => {
    // 웹 소켓 연결 및 구독을 이펙트 내부로 이동
    websocketClient.subscribe(
      "/topic/game/" + roomNumber,
      function (messageOutput) {
        console.log("수락 모두 완료!", messageOutput.body);
        const userInfoDtos = JSON.parse(
          messageOutput.body,
        ) as CommonType.TGameUserInfoDto;
        const myInfo = userInfoDtos[0] as CommonType.TmyGameinfo;
        const enemyInfo = userInfoDtos[1] as CommonType.TenemyGameinfo;
        console.log("큐 웨이트 내 정보:", myInfo);
        console.log("큐 웨이트 내정보 아이템", myInfo.equippedItems);
        console.log("큐 웨이트 정보", enemyInfo);
        // 리액트 쿼리에 데이터 저장
        queryClient.setQueryData(["myGameinfo"], myInfo);
        queryClient.setQueryData(["enemyGameinfo"], enemyInfo);
        navigation.navigate("PlayGameStart", {
          roomNumber: roomNumber,
        });
      },
    );
  }, []);

  // websocketClient.subscribe(
  //   "/topic/game/" + roomNumber,
  //   function (messageOutput) {
  //     console.log("큐웨이트", messageOutput.body);
  //     const userInfoDtos = JSON.parse(
  //       messageOutput.body,
  //     ) as CommonType.TGameUserInfoDto;
  //     const myInfo = userInfoDtos[1] as CommonType.TenemyGameinfo;
  //     const enemyInfo = userInfoDtos[0] as CommonType.TenemyGameinfo; // Cast to the correct type
  //     console.log("큐 웨이트 내 정보:", myInfo);
  //     console.log("큐 웨이트 내정보 아이템", myInfo.equippedItems);
  //     console.log("큐 웨이트 정보", enemyInfo);

  //     setTimeout(() => {
  //       navigation.navigate("PlayGameStart", {
  //         roomNumber: roomNumber,
  //       });
  //     }, 1000); // Adjust this timeout if needed
  //   },
  // );
  // 연결 함수 호출

  // Unmount 시점에 웹소켓 연결 종료
  // return () => {
  //   if (websocketClient.connected) {
  //     websocketClient.disconnect();
  //   }
  // };

  // [websocketClient, roomNumber, navigation]
  // // WebSocket connection
  // const stompClient = Stomp.over(new SockJS(WEBSOCKET_URL));

  // stompClient.connect({}, function (frame) {
  //   stompClient.subscribe("/topic/game/" + roomNumber, function (message) {
  //     console.log(message);
  //     navigation.navigate("PlayGameStart", {
  //       roomNumber: roomNumber,
  //       websocketClient: websocketClient,
  //     });
  //   });
  // });

  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={bluePlayBackground}
        resizeMode="cover"
        className="flex-1"
      >
        <View style={styles.buttonwrapper} />

        <View className="flex z-20">
          <Image style={styles.bluecard} source={blueCard} />
        </View>
        <View className="flex w-full h-full bg-black opacity-70" />

        <Image className="opacity-70" style={styles.bluFin} source={blueFin} />
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
  buttonwrapper: {
    flex: 1,
    top: "60%",
    left: "50.5%",
    zIndex: 20,
  },
  infomessage: {
    bottom: "100%",
    zIndex: 20,
  },
  acceptbutton: {
    position: "absolute",
    width: 75,
    height: 45,
    top: 0,
    right: "100%",
    bottom: 100,
    zIndex: 80,
  },
  rejectbutton: {
    position: "absolute",
    width: 75,
    height: 45,
    top: 0,
    bottom: 100,
    zIndex: 80,
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
    bottom: "31%",
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
