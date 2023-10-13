import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import Chingho from "../assets/icons/chingho.png";
import Chijang from "../assets/icons/chijang.png";
import Sobi from "../assets/icons/sobi.png";
import Character from "../assets/icons/character.png";
import { screenHeight, screenWidth } from "../utils/common";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { useEffect } from "react";
import Config from "react-native-config";
function ShopEntrance() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const offset = useSharedValue(5);
  const animatedRowStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
  const animatedColStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: -offset.value }],
  }));
  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 500 }),
      -5,
      true,
    );
  }, [offset]);
  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 500 }),
      -5,
      true,
    );
  }, [offset]);
  return (
    <View className="flex flex-1 w-full h-full">
      <ImageBackground
        source={{
          uri: `${Config.IMAGE_URL}/asset/shopBackground.png`,
        }}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="top-10">
          <Pressable
            className="absolute bg-transparent w-24 h-24"
            style={{
              top: screenHeight / 2.6,
              left: screenWidth / 2.5,
            }}
            onPress={() => navigation.navigate("Shop", { category: "소모품" })}
          >
            <Animated.View style={[animatedRowStyles]}>
              <Image
                source={Sobi as ImageSourcePropType}
                className="absolute rounded-[20px] w-24 h-28 z-10"
              />
            </Animated.View>
          </Pressable>

          <Pressable
            className="absolute w-24 h-24"
            style={{
              top: screenHeight / 2,
              left: screenWidth / 11,
            }}
            onPress={() => navigation.navigate("Shop", { category: "칭호" })}
          >
            <Animated.View style={[animatedColStyles]}>
              <Image
                source={Chingho as ImageSourcePropType}
                className="absolute rounded-[20px] w-24 h-28"
              />
            </Animated.View>
          </Pressable>

          <Pressable
            className="absolute w-24 h-24"
            style={{
              top: screenHeight / 2,
              left: screenWidth / 1.4,
            }}
            onPress={() => navigation.navigate("Shop", { category: "치장" })}
          >
            <Animated.View style={[animatedColStyles]}>
              <Image
                source={Chijang as ImageSourcePropType}
                className="absolute rounded-[20px] w-24 h-28"
              />
            </Animated.View>
          </Pressable>

          <Pressable
            className="absolute w-24 h-24"
            style={{
              top: screenHeight / 1.6,
              left: screenWidth / 2.5,
            }}
            onPress={() => navigation.navigate("Shop", { category: "캐릭터" })}
          >
            <Animated.View style={[animatedRowStyles]}>
              <Image
                source={Character as ImageSourcePropType}
                className="absolute rounded-[20px] w-24 h-28"
              />
            </Animated.View>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ShopEntrance;
