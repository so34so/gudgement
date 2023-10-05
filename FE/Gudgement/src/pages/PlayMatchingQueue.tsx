import BluePlayBackground from "../assets/images/blueplaybackground.png";
import BlueFin from "../assets/images/bluefin.png";
import BlueCard from "../assets/images/bluecard.png";
import AcceptButton from "../assets/images/accept.png";
import RejectButton from "../assets/images/reject.png";
import QueueBox from "../assets/images/queuebox.png";
import MatchingTimerBar from "../components/MatchingTimerBar";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
} from "react-native";

export default function PlayMatchingQueue({
  userData,
  roomNumber,
  sendHandler,
  setNowGameComponent,
}) {
  const bluePlayBackground: ImageSourcePropType =
    BluePlayBackground as ImageSourcePropType;
  const blueCard: ImageSourcePropType = BlueCard as ImageSourcePropType;
  const blueFin: ImageSourcePropType = BlueFin as ImageSourcePropType;
  const acceptButton: ImageSourcePropType = AcceptButton as ImageSourcePropType;
  const rejectButton: ImageSourcePropType = RejectButton as ImageSourcePropType;
  const queueBox: ImageSourcePropType = QueueBox as ImageSourcePropType;

  // 게임 수락 함수
  const acceptMatch = () => {
    const Payload = {
      nickName: userData.nickname,
      roomNumber: roomNumber,
    };

    sendHandler("/app/game/accept", Payload, () => {});
    setNowGameComponent("PlayMatchingQueueWait");
  };

  // 수락 거절 함수
  const rejectMatch = () => {
    const Payload2 = {
      nickName: userData.nickname,
      roomNumber: roomNumber,
    };

    sendHandler("/app/game/reject", Payload2, () => {});
    setNowGameComponent("PlaySelect");
  };

  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={bluePlayBackground}
        resizeMode="cover"
        className="flex-1"
      >
        <MatchingTimerBar duration={20} />
        <View style={styles.buttonwrapper}>
          <TouchableOpacity onPress={acceptMatch}>
            <Image style={styles.acceptbutton} source={acceptButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={rejectMatch}>
            <Image style={styles.rejectbutton} source={rejectButton} />
          </TouchableOpacity>
        </View>

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
