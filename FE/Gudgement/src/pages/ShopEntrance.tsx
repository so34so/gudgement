import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  Text,
  View,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { IMAGE_URL } from "@env";
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
          uri: `${IMAGE_URL}/asset/shopBackground.png`,
        }}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="top-10">
          <Animated.View style={[animatedRowStyles]}>
            <Pressable
              onPress={() =>
                navigation.navigate("Shop", { category: "소모품" })
              }
            >
              <Image
                source={Sobi as ImageSourcePropType}
                style={{
                  top: screenHeight / 2.6,
                  left: screenWidth / 2.5,
                }}
                className="absolute rounded-[20px] w-24 h-28"
              />
            </Pressable>
          </Animated.View>

          <Animated.View style={[animatedColStyles]}>
            <Pressable
              onPress={() => navigation.navigate("Shop", { category: "칭호" })}
            >
              <Image
                source={Chingho as ImageSourcePropType}
                style={{
                  top: screenHeight / 2,
                  left: screenWidth / 11,
                }}
                className="absolute rounded-[20px] w-24 h-28"
              />
            </Pressable>
          </Animated.View>

          <Animated.View style={[animatedColStyles]}>
            <Pressable
              onPress={() => navigation.navigate("Shop", { category: "치장" })}
            >
              <Image
                source={Chijang as ImageSourcePropType}
                style={{
                  top: screenHeight / 2,
                  left: screenWidth / 1.4,
                }}
                className="absolute rounded-[20px] w-24 h-28"
              />
            </Pressable>
          </Animated.View>

          <Animated.View style={[animatedRowStyles]}>
            <Pressable
              onPress={() =>
                navigation.navigate("Shop", { category: "캐릭터" })
              }
            >
              <Image
                source={Character as ImageSourcePropType}
                style={{
                  top: screenHeight / 1.6,
                  left: screenWidth / 2.5,
                }}
                className="absolute rounded-[20px] w-24 h-28"
              />
            </Pressable>
          </Animated.View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default ShopEntrance;
