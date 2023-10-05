import { CommonType } from "../types/CommonType";
import myBlueCard from "../assets/images/mybluecard.png";

import {
  Image,
  ImageSourcePropType,
  Text,
  View,
  StyleSheet,
} from "react-native";
const myblueCard: ImageSourcePropType = myBlueCard as ImageSourcePropType;

export default function GameResultSystem({ cardInfo }: { cardInfo: object }) {
  const myCard: CommonType.TplayCard[] = cardInfo;
  return (
    <View style={styles.bettingwrapper}>
      <Text
        className="rounded-lg text-white text-[60px] font-PretendardBold"
        style={styles.mycardnumber}
      >
        {myCard.order}
      </Text>
      <View style={styles.mycardtext}>
        <Text
          className="rounded-lg  text-center text-white text-[20px] font-PretendardBold"
          style={styles.mycardtitle}
        >
          {myCard.name}
        </Text>
        <Text
          className="rounded-lg  text-center text-white text-[24px] font-PretendardBold"
          style={styles.mycardtitle}
        >
          {myCard.amount}
        </Text>
      </View>
      <Image style={styles.mycard} source={myblueCard} />
    </View>
  );
}

const styles = StyleSheet.create({
  bettingwrapper: {
    flex: 1,
    position: "absolute",
    top: "30%",
    left: "43%",
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
  mycard: {
    right: "25%",
    width: 140,
    height: 180,
  },
  mycardnumber: {
    zIndex: 6,
    position: "absolute",
    left: -40,
    top: 40,
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 3, height: 3 }, // 섀도우 오프셋
    textShadowRadius: 9, // 섀도우 반경 (두께)
  },
  mycardtext: {
    zIndex: 5,
    top: 120,
    right: "0%",
    width: "50%",
    height: "30%",
    alignItems: "center",
  },
  mycardtitle: {
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
