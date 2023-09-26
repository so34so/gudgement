import VolcanoMap from "../assets/images/volcanomap.png";
import Snake from "../assets/images/snake.png";
import PingPing from "../assets/images/pingping.png";
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
import { NavigationProp, useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
interface Game {
  user: string;
  message: string;
}

export default function PlayGame() {
  useEffect(() => {
    StatusBar.setHidden(true);
  }, []);

  const [serverState, setServerState] = useState("Loading...");
  const [messageText, setMessageText] = useState("");
  const [serverMessages, setServerMessages] = useState([]);
  const userId = "ddd";
  const WSUrl = "ws://j9d106.p.ssafy.io:8080";
  console.log(WSUrl);
  const volcanoMap: ImageSourcePropType = VolcanoMap as ImageSourcePropType;
  const snake: ImageSourcePropType = Snake as ImageSourcePropType;
  const pingping: ImageSourcePropType = PingPing as ImageSourcePropType;

  const ws = new WebSocket(WSUrl);
  ws.onopen = () => {
    // connection opened
    ws.send("something"); // send a message
    console.log("새로운 클라이언트 접속");
  };

  ws.onmessage = e => {
    // a message was received
    console.log(e.data);
  };

  ws.onerror = e => {
    // an error occurred
    console.log(e.message);
  };

  ws.onclose = e => {
    // connection closed
    console.log(e.code, e.reason);
  };

  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={volcanoMap}
        resizeMode="cover"
        className="flex-1"
      >
        <GameBettingSyetem />
        <GameUi />
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
