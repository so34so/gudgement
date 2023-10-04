import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ResultAnimation = ({ result, rounds }) => {
  const opacity = useSharedValue(-0);
  const translateY = useSharedValue(-100);

  const animatedContainerStyle = useAnimatedStyle(() => ({
    width: "100%",
    height: "100%",
    opacity: opacity.value,
    backgroundColor: result ? "#34B859" : "#FF0000",
  }));

  const animatedTextStyle = useAnimatedStyle(() => ({
    color: "white",
    fontFamily: "Pretendard",
    fontWeight: "800",
    zIndex: 9,
    fontSize: 36,
    backgroundColor: null,
    transform: [{ translateY: translateY.value }],
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 9,
  }));

  useEffect(() => {
    // Start animation
    opacity.value = withTiming(0.7, { duration: 1000 });
    translateY.value = withTiming(0, { duration: 1000 });
  }, [result, rounds]);

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.View style={animatedContainerStyle} />
      <Animated.Text style={animatedTextStyle}>
        {rounds}라운드 {result ? "승리했습니다!" : "패배했습니다!"}
      </Animated.Text>
    </View>
  );
};

export default ResultAnimation;
