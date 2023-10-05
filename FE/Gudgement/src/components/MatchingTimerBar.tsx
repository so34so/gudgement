import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet } from "react-native";

export default function MatchingTimerBar({ duration }) {
  const widthAnim = useRef(new Animated.Value(100)).current; // 초기 게이지 너비를 100%로 설정

  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: 0,
      duration: duration * 1000,
      useNativeDriver: false,
    }).start();
  }, [duration]);

  return (
    <View style={styles.centeredContainer}>
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.innerBar,
            {
              width: widthAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    top: "55%",
  },
  container: {
    height: 20,
    width: "70%",
    backgroundColor: "gray",
    borderRadius: 10,
    shadowColor: "white",
    shadowOffset: {
      width: 8,
      height: 8,
    },
    shadowOpacity: 0.7,
    shadowRadius: 1.84,
  },
  innerBar: {
    height: "100%",
    backgroundColor: "#1635b7",
    borderRadius: 5,
  },
});
