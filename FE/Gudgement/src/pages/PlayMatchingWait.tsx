import BluePlayBackground from "../assets/images/blueplaybackground.png";
import BlueFin from "../assets/images/bluefin.png";
import BlueBlur from "../assets/images/blueblur.png";
import FlameMatch from "../assets/images/flamematch2.gif";
import SmallCloseButton from "../components/SmallCloseButton";
import BlueFlame from "../assets/images/blueflame.gif";
import MatchingInfoBox from "../assets/images/matchingInfoBox.png";
import React, { useEffect, useRef, useState } from "react";
import Reactotron from "reactotron-react-native";
import "../../globals.js";
import axios from "axios";
import {
  View,
  StyleSheet,
  ImageBackground,
  Pressable,
  Image,
  Text,
  ImageSourcePropType,
} from "react-native";
import {
  NavigationProp,
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { useWebSocket } from "../components/WebSocketContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { CommonType } from "../types/CommonType";
import Config from "react-native-config";

export default function PlayMatchingWait({ route }) {
  const { memberId, nickName, grade, tiggle, timestamp } = route.params;
  const websocketClient = useWebSocket();
  const { data: userInfo } = useQuery<CommonType.TUser>({
    queryKey: ["fetchUserInfo"],
  });
  const MEMBER_ID = userInfo?.memberId;
  const MEMBER_NickName = userInfo?.nickname;
  const MEMBER_RoleUser = "silver";
  useEffect(() => {
    if (websocketClient) {
      // 이미 연결된 웹소켓 클라이언트에 대한 메시지 구독 설정
      websocketClient.subscribe("/queue/start/" + nickName, message => {
        console.log("Room number: " + message.body);
        Reactotron.log!("Room number: " + message.body);
        const roomNumber = message.body.replace(/"/g, "");
        navigation.navigate("PlayMatchingQueue", {
          roomNumber: roomNumber,
          nickName: nickName,
        });
      });
    }
    // return () => {
    //   // 언마운트 시 구독 해제 - 필요에 따라 조정
    //   if (websocketClient.connected) {
    //     websocketClient.disconnect();
    //   }
    //   websocketClient.unsubscribe("/queue/start/" + nickName);
    // };
  }, [websocketClient]);

  const bluePlayBackground: ImageSourcePropType =
    BluePlayBackground as ImageSourcePropType;
  const blueBlur: ImageSourcePropType = BlueBlur as ImageSourcePropType;
  const blueFin: ImageSourcePropType = BlueFin as ImageSourcePropType;
  const blueFlame: ImageSourcePropType = BlueFlame as ImageSourcePropType;
  const flameMatch: ImageSourcePropType = FlameMatch as ImageSourcePropType;
  const matchInfobox: ImageSourcePropType =
    MatchingInfoBox as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const offset = useSharedValue(5);
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));

  const [elapsedTime, setElapsedTime] = useState(0);
  // // 매칭 수락 함수
  // async function postMatchStart() {
  //   try {
  //     const response = await axios.post(`${API_URL}/match/addUser`, {
  //       memberId: MEMBER_ID,
  //       nickName: MEMBER_NickName,
  //       grade: MEMBER_RoleUser,
  //       tiggle: tiggle,
  //       timestamp: 0,
  //     });
  //     Reactotron.log!("흠", response.data);
  //     return response;
  //   } catch (error) {
  //     Reactotron.log!(error);
  //     return undefined; // 에러 시 undefined를 반환하거나 다른 오류 처리 방식을 선택하세요.
  //   }
  // }
  // 매칭 취소 함수
  async function postMatchClose() {
    try {
      const response = await axios.post(`${Config.API_URL}/match/removeUser`, {
        memberId: memberId,
        nickName: nickName,
        grade: grade,
        tiggle: tiggle,
        timestamp: timestamp,
      });
      console.log("응답:", response.data);
      return response;
    } catch (error) {
      console.error("에러:", error);
      return undefined; // 에러 시 undefined를 반환하거나 다른 오류 처리 방식을 선택하세요.
    }
  }

  const handleCloseMatch = async () => {
    try {
      await postMatchClose();
      navigation.navigate("PlaySelect");
    } catch (error) {
      console.error("매칭 취소 중 오류 발생", error);
      // 오류가 발생했을 때의 처리를 수행
    }
  };

  // useEffect(() => {
  //   offset.value = withRepeat(
  //     withTiming(-offset.value, { duration: 300 }),
  //     -1,
  //     true,
  //   );

  //   const intervalId = setInterval(() => {
  //     setElapsedTime(prevTime => prevTime + 1);
  //   }, 1000);

  //   // 컴포넌트가 언마운트될 때 인터벌 정리
  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [offset]);

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
          <Pressable onPress={handleCloseMatch}>
            <SmallCloseButton />
          </Pressable>
        </View>
        <View style={styles.matchInfobox}>
          <Text
            style={styles.elapsedTimeText}
            className="rounded-lg text-white text-[44px] font-PretendardExtraBold"
          >
            {formatElapsedTime(elapsedTime)}
          </Text>
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

// 경과 시간을 MM:SS 형식으로 포맷하는 함수
function formatElapsedTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
}

// 숫자를 두 자릿수로 맞춰줍니다 (0을 추가)
function padWithZero(number: number) {
  return number.toString().padStart(2, "0");
}
