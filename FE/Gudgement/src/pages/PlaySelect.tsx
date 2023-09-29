import PlayBackground2 from "../assets/images/playBackground2.png";
import LineGradi from "../assets/images/linegradi.png";
import Cards from "../assets/images/cards.png";
import CloseButton from "../components/CloseButton";
import PlayCarousel from "../components/PlayCarousel";
import { API_URL, IMAGE_URL } from "@env";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Image,
  Text,
  ImageSourcePropType,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";

function PlaySelect() {
  const playBackground2: ImageSourcePropType =
    PlayBackground2 as ImageSourcePropType;
  const lineGradi: ImageSourcePropType = LineGradi as ImageSourcePropType;

  const cards: ImageSourcePropType = Cards as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  return (
    <View style={styles.container}>
      <ImageBackground
        source={playBackground2}
        resizeMode="cover"
        style={styles.background}
      >
        <Pressable onPress={() => navigation.navigate("플레이")}>
          <CloseButton />
        </Pressable>
        <PlayCarousel />

        <View style={styles.cards}>
          <Image
            className="w-[205] h-[168]"
            source={cards}
            resizeMode="contain"
          />
        </View>
        {/* <BettingMachine /> */}

        <View style={styles.lineGradi} className="flex items-center">
          <Pressable onPress={() => navigation.navigate("PlayMatchingWait")}>
            <Text className="flex m-auto justify-center rounded-lg text-white text-[32px] font-PretendardExtraBold">
              대전 찾기
            </Text>
            <Image className="mt-12" source={lineGradi} />
          </Pressable>
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
  cards: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "90%",
    left: "25%",

    zIndex: 10,
  },
  lineGradi: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 360,
    height: 75,
    top: "85%",
    left: "5%",
    zIndex: 9,
  },
  mapTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "52%",
    left: "39%",
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  mapInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "57%",
    left: "29%",
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "10%", // Two-thirds of the way down
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default PlaySelect;
