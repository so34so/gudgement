import BluePlayBackground from "../assets/images/blueplaybackground.png";
import BlueFin from "../assets/images/bluefin.png";
import BlueCard from "../assets/images/bluecard.png";
import AcceptButton from "../assets/images/accept.png";
import RejectButton from "../assets/images/reject.png";
import QueueBox from "../assets/images/queuebox.png";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL, IMAGE_URL } from "@env";
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
import { WEBSOCKET_URL } from "@env";

export default function PlayMatchingQueueWait({ route }) {
  const { roomNumber, nickName } = route.params; // 추가
  const bluePlayBackground: ImageSourcePropType =
    BluePlayBackground as ImageSourcePropType;
  const blueCard: ImageSourcePropType = BlueCard as ImageSourcePropType;
  const blueFin: ImageSourcePropType = BlueFin as ImageSourcePropType;
  const acceptButton: ImageSourcePropType = AcceptButton as ImageSourcePropType;
  const rejectButton: ImageSourcePropType = RejectButton as ImageSourcePropType;
  const queueBox: ImageSourcePropType = QueueBox as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  // WebSocket connection
  const stompClient = Stomp.over(new SockJS(WEBSOCKET_URL));

  stompClient.connect({}, function (frame) {
    stompClient.subscribe("/topic/game/" + roomNumber, function (message) {
      console.log(message);
      navigation.navigate("PlayGameStart", { roomNumber: message.body });
    });
  });

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

        <View style={styles.queuebox}>
          <Image style={styles.queuebox} source={queueBox} />
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
