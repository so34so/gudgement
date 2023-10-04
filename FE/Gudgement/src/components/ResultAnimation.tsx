import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ResultAnimation = ({ result, rounds }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => ({
    width: 760,
    height: 1600,
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
    backgroundColor: result ? "green" : "red",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  }));

  useEffect(() => {
    // Reset animation values
    opacity.value = 100;
    translateY.value = -10;

    // Start animation
    opacity.value = withTiming(1, { duration: 30 });
    translateY.value = withTiming(200, { duration: 40 });
  }, [result, rounds]); // Add props to dependency array

  return (
    <Animated.View style={animatedStyle}>
      <Animated.Text style={{ color: "white", fontSize: 800 }}>
        {rounds}라운드 {result ? "승리했습니다!" : "패배했습니다!"}
      </Animated.Text>
    </Animated.View>
  );
};

export default ResultAnimation;
