import PlayBackground2 from "../assets/images/playBackground2.png";
import MapType from "../assets/images/maptype.png";
import Cards from "../assets/images/cards.png";
import CloseButton from "../components/CloseButton";
import PlayCarousel from "../components/PlayCarousel";
import BettingMachine from "../components/BettingMachine";
import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Image,
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
          <Image source={cards} />
        </View>
        {/* <BettingMachine /> */}
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
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "60%",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
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
