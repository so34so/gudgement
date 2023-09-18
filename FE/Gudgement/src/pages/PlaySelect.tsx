import PlayBackground2 from "../assets/images/playBackground2.png";
import MapType from "../assets/images/maptype.png";
import Cards from "../assets/images/cards.png";
import CloseButton from "../components/CloseButton";
import BettingMachine from "../components/BettingMachine";
import {
  ImageBackground,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";

function PlaySelect() {
  const playBackground2: ImageSourcePropType =
    PlayBackground2 as ImageSourcePropType;
  const mapyType: ImageSourcePropType = MapType as ImageSourcePropType;
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
        <Text
          className="color-[#ffb800] text-[32px] font-PretendardExtraBold "
          style={styles.mapTitle}
        >
          맵 설명
        </Text>
        <Text
          className="color-[#ffffff] text-[24px] font-PretendardSemiBold "
          style={styles.mapInfo}
        >
          맵 설명을 적습니다
        </Text>
        <View style={styles.centeredView}>
          <Image source={mapyType} />
        </View>
        <View style={styles.cards}>
          <Image source={cards} />
        </View>
        <Pressable onPress={() => navigation.navigate("Play")}>
          <CloseButton />
        </Pressable>
        <BettingMachine />
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
