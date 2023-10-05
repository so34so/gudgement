import { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";
import myBlueCard from "../assets/images/mybluecard.png";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import SmallCloseButton from "./SmallCloseButton";
import GameUI from "../assets/images/gameui.png";
import { CommonType } from "../types/CommonType";
import Config from "react-native-config";
function GameCardCollection({
  myInfoState,
  isVisible,
  onClose,
}: {
  myInfoState: any;
  isVisible: boolean;
  onClose: () => void;
}) {
  const cards = myInfoState?.cards;
  const myblueCard: ImageSourcePropType = myBlueCard as ImageSourcePropType;

  return isVisible ? (
    <View>
      <StatusBar hidden />
      <View
        style={{
          position: "absolute",
          zIndex: 1000,
          width: "100%",
          height: 280,
          top: -900,
          backgroundColor: "rgba(0,0,0,0.8)",
        }}
      >
        <TouchableOpacity onPress={onClose}>
          <SmallCloseButton />
        </TouchableOpacity>
        <View className="bottom-[-70]">
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {cards.map((card, index) => (
              <View
                key={index}
                style={{ right: 20, marginLeft: 40, width: 111, height: 143 }}
              >
                <ImageBackground
                  resizeMode="cover"
                  style={{ flex: 1 }}
                  source={myblueCard}
                >
                  <View style={styles.bettingwrapper}>
                    <Text
                      className="rounded-lg text-white text-[40px] font-PretendardBold"
                      style={styles.enemycardnumber}
                    >
                      {card.order}
                    </Text>
                    <View style={styles.bettingcardwrapper}>
                      <View style={styles.enemycardtext}>
                        <Text
                          className="rounded-lg text-center text-white text-[20px] font-PretendardBold"
                          style={styles.enemycardtitle}
                        >
                          {card.name}
                        </Text>
                        <Text
                          className="rounded-lg text-center text-white text-[20px] font-PretendardBold"
                          style={styles.enemycardtitle}
                        >
                          {card.amount}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  ) : null;
}

export default GameCardCollection;

const styles = StyleSheet.create({
  bettingwrapper: {
    flex: 1,
    position: "absolute",
    top: -50,
    left: "23%",
  },
  buttonwrapper: {
    flex: 1,
    top: "60%",
    left: "50.5%",
  },
  cardwrapper: {
    flex: 1,
    top: "30%",
  },
  bettingcardwrapper: {
    position: "absolute",
    width: 500,
    left: -30,
    top: -30,
    height: 200,
  },
  infomessage: {
    bottom: "100%",
    zIndex: 20,
  },
  enemycard: {
    right: "25%",
  },
  enemycardnumber: {
    zIndex: 6,
    position: "absolute",
    left: -35,
    top: 40,
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 3, height: 3 }, // 섀도우 오프셋
    textShadowRadius: 9, // 섀도우 반경 (두께)
  },
  enemycardtext: {
    zIndex: 5,
    top: 120,
    right: "13%",
    width: "50%",
    height: "30%",
    alignItems: "center",
  },
  enemycardtitle: {
    textShadowColor: "rgba(0, 0, 0, 0.95)",
    textShadowOffset: { width: 1, height: 1 }, // 섀도우 오프셋
    textShadowRadius: 5, // 섀도우 반경 (두께)
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
