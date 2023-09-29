import BluePlayBackground from "../assets/images/blueplaybackground.png";
import BlueFin from "../assets/images/bluefin.png";
import BlueBlur from "../assets/images/blueblur.png";
import FlameMatch from "../assets/images/flamematch2.gif";
import SmallCloseButton from "../components/SmallCloseButton";
import BlueFlame from "../assets/images/blueflame.gif";
import MatchingInfoBox from "../assets/images/matchingInfoBox.png";
import React, { useEffect, useRef, useState } from "react";
import Reactotron from "reactotron-react-native";
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
} from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { CompatClient, Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import { SERVER_URL } from '@env'; 


export default function PlayMatchingWait({ route }) {
  const { memberId, nickName, roleUser, tiggle, timestamp } = route.params;
  const socket = new SockJS("http://j9d106.p.ssafy.io:8080/ws");
  const stompClient = Stomp.over(socket);
  stompClient.connect({}, function(frame) {
    console.log('Connected: ' + frame);
    stompClient.subscribe('/user/queue/start', function(messageOutput) {
        console.log('Room number: ' + messageOutput.body);
    });
});

  // const client = useRef<CompatClient>();
  // const handleGameRoomCreated = (message) => {
  //   // 이 함수는 서버에서 게임 방이 생성되었을 때 호출됩니다.
  //   const messageBody = JSON.parse(message.body);
  //   Reactotron.log!("게임 방이 생성되었습니다. 방 번호:", messageBody.roomNumber);
  //   // 여기에서 게임 방 번호를 저장하거나 처리할 수 있습니다.
  // };


  // const connectHandler = () => {
  //   client.current = Stomp.over(() => {
  //     const sock = new SockJS(`${SERVER_URL}`);
  //     Reactotron.log!(sock);
  //     return sock;
  //   });

  //   client.current.connect({}, (frame) => {
  //     Reactotron.log!("Connected: " + frame);
  //     client.current.subscribe('/queue/start', function(messageOutput) {
  //       Reactotron.log!('Room number: ' + messageOutput.body);
  //     });
  //   });
  // };

//   // URL 정의
// const serverUrl = 'http://j9d106.p.ssafy.io:8080/ws/info?t=1695980196936';

// // Axios를 사용하여 GET 요청 보내기
// axios.get(serverUrl)
//   .then(response => {
//     // 성공적으로 데이터를 받았을 때 수행할 작업
//     const responseData = response.data; // 서버에서 반환한 데이터
//     console.log('서버로부터 반환된 데이터:', responseData);
//     navigation.navigate("PlayMatchingQueue");
//     // 이곳에서 responseData를 가공하거나 처리할 수 있습니다.
//   })
//   .catch(error => {
//     // 요청이 실패했을 때 수행할 작업
//     console.error('GET 요청 중 오류 발생:', error);
//     // 에러 처리 로직을 추가할 수 있습니다.
//   });

  // useEffect(() => {
  //   connectHandler();

  //   return () => {
  //     if (client.current && client.current.connected) {
  //       client.current.disconnect();
  //     }
  //   };
  // }, []);

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


  // 매칭 취소 함수
  async function postMatchClose() {
    try {
      const response = await axios.post(`${SERVER_URL}/match/removeUser`, {
        memberId: memberId,
        nickName: nickName,
        roleUser: roleUser,
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
      navigation.navigate("PlayMatchingSelect");
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
