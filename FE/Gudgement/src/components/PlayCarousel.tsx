import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import { CommonType } from "../types/CommonType";
import Map1 from "../assets/images/map1.png";
import Map2 from "../assets/images/map2.png";
import Map3 from "../assets/images/map3.png";
import MapCard from "../assets/images/mapcard.png";
import MapType from "../assets/images/maptype.png";

const map1: ImageSourcePropType = Map1 as ImageSourcePropType;
const map2: ImageSourcePropType = Map2 as ImageSourcePropType;
const map3: ImageSourcePropType = Map3 as ImageSourcePropType;
const mapCard: ImageSourcePropType = MapCard as ImageSourcePropType;

const mapType: ImageSourcePropType = MapType as ImageSourcePropType;
const mapInfoArray: CommonType.Tplaymap[] = [
  {
    title: "Map 1",
    description: "맵 설명이 들어갈 자리 1",
    image: map1, // 맵 이미지 경로
    ticle: "x100",
  },
  {
    title: "Map 2",
    description: "맵 설명이 들어갈 자리 2",
    image: map2,
    ticle: "x300",
  },
  {
    title: "Map 3",
    description: "맵 설명이 들어갈 자리 3",
    image: map3,
    ticle: "x500",
  },
];

const screenHeight = Math.round(Dimensions.get("window").height);

function PlayCarousel() {
  const [selectItem, setSelectItem] = useState(0);

  const nextMap = () => {
    // 다음 맵으로 이동
    setSelectItem(prevItem => (prevItem + 1) % mapInfoArray.length);
  };

  const prevMap = () => {
    // 이전 맵으로 이동
    setSelectItem(prevItem =>
      prevItem === 0 ? mapInfoArray.length - 1 : prevItem - 1,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.buttonContainer}>
          {/* 이전 버튼 */}
          <TouchableOpacity onPress={prevMap}>
            <View style={styles.buttonBorder}>
              <View style={styles.prevButton} />
            </View>
          </TouchableOpacity>
          {/* 다음 버튼 */}
          <TouchableOpacity onPress={nextMap}>
            <View style={styles.buttonBorder2}>
              <View style={styles.nextButton} />
            </View>
          </TouchableOpacity>
        </View>
        <ImageBackground
          source={mapCard}
          resizeMode="cover"
          style={styles.mapCard}
        >
          <Image
            source={mapInfoArray[selectItem].image}
            style={styles.mapIcon}
          />
        </ImageBackground>

        <ImageBackground
          source={mapType}
          resizeMode="cover"
          style={styles.mapType}
        >
          <View style={styles.mapTextContainer}>
            <Text style={styles.mapTicle}>
              {mapInfoArray[selectItem].ticle}
            </Text>
            <Text style={styles.mapTitle}>
              {mapInfoArray[selectItem].title}
            </Text>
            <Text style={styles.mapInfo}>
              {mapInfoArray[selectItem].description}
            </Text>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    bottom: 70,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: screenHeight * 0.6, // 화면 세로 길이 기준 60%
  },
  mapCard: {
    width: 196,
    height: 237,
    alignItems: "center",
    justifyContent: "center",
  },
  mapType: {
    width: 330,
    height: 245,
  },
  mapIcon: {
    width: 50,
    height: 50,
  },
  mapTextContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapTitle: {
    color: "#ffb800",
    fontSize: 32,
    fontWeight: "bold",
  },
  mapTicle: {
    color: "#ffffff",
    fontSize: 40,
    fontWeight: "bold",
    textShadowColor: "rgb(0, 0, 0)", // 텍스트 테두리 색상
    textShadowOffset: { width: 4, height: 4 }, // 텍스트 테두리 오프셋
    textShadowRadius: 4, // 텍스트 테두리 반경
  },
  mapInfo: {
    color: "#ffffff",
    fontSize: 24,
    fontWeight: "600",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    width: "100%",
    top: 140,
  },
  buttonBorder: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 20, // 삼각형의 높이
    borderTopColor: "transparent", // 삼각형의 윗 부분 투명
    borderBottomWidth: 20, // 삼각형의 높이
    borderBottomColor: "transparent", // 삼각형의 아랫 부분 투명
    borderRightWidth: 30, // 삼각형의 폭
    borderRightColor: "#ffffff75", // 삼각형의 색상
    transform: [{ rotate: "0deg" }], // 90도 회전
    clipPath: "polygon(0 0, 100% 50%, 0 100%)", // 삼각형 모양의 클리핑 경로
  },
  buttonBorder2: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 20, // 삼각형의 높이
    borderTopColor: "transparent", // 삼각형의 윗 부분 투명
    borderBottomWidth: 20, // 삼각형의 높이
    borderBottomColor: "transparent", // 삼각형의 아랫 부분 투명
    borderRightWidth: 30, // 삼각형의 폭
    borderRightColor: "#ffffff75", // 삼각형의 색상
    transform: [{ rotate: "-180deg" }], // 90도 회전
    // clipPath: "polygon(0 0, 100% 50%, 0 100%)", // 삼각형 모양의 클리핑 경로
  },
  prevButton: {
    position: "absolute",
    borderTopWidth: 13, // 삼각형의 높이
    borderTopColor: "transparent", // 삼각형의 윗 부분 투명
    borderBottomWidth: 13, // 삼각형의 높이
    borderBottomColor: "transparent", // 삼각형의 아랫 부분 투명
    borderRightWidth: 19, // 삼각형의 폭
    left: 7,
    borderRightColor: "#000000", // 삼각형의 색상
    // clipPath: "polygon(0 0, 100% 50%, 0 100%)", // 삼각형 모양의 클리핑 경로
  },
  nextButton: {
    position: "absolute",
    borderTopWidth: 13, // 삼각형의 높이
    borderTopColor: "transparent", // 삼각형의 윗 부분 투명
    borderBottomWidth: 13, // 삼각형의 높이
    borderBottomColor: "transparent", // 삼각형의 아랫 부분 투명
    borderRightWidth: 19, // 삼각형의 폭
    left: 7,
    borderRightColor: "#000000", // 삼각형의 색상
    clipPath: "polygon(0 0, 100% 50%, 0 100%)", // 삼각형 모양의 클리핑 경로
  },
  buttonText: {
    fontSize: 18,
    color: "white",
    // backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
});

export default PlayCarousel;
