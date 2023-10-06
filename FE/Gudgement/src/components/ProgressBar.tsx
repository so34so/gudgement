import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Animated } from "react-native";

/**
 * useEffect로 percent변경될 때 마다 애니메이션 동작하게끔 구현
 * 애니메이션: 2초 동안 progress바 너비의 n%만큼의 검은색 바를 생성
 * 애니메이션 완료되면 소비내역 퍼센테이지에 따라
 * 절약일 때는 main색, 안정일 땐 무색, 위험일 때는 빨간 색으로 설정
 */
const ProgressBar = ({ percent }: { percent: number }) => {
  const [progress] = useState(new Animated.Value(0));
  const containerRef = useRef<View>(null);
  const [progressColor, setProgressColor] = useState("bg-sub02");
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 370 * percent,
      duration: 2000,
      useNativeDriver: false,
    }).start(() => {
      if (percent <= 0.5) {
        setProgressColor("bg-mainColor");
      }
      if (percent > 0.7) {
        setProgressColor("bg-red");
      }
    });
  }, [percent, progress]);

  useEffect(() => {
    setProgressColor("bg-sub02");
  }, [percent]);

  return (
    <View
      style={styles.container}
      className={`border-2 border-white ${progressColor}`}
      ref={containerRef}
    >
      <Animated.View
        style={[styles.bar, { width: progress }]}
        className="rounded-[10px]"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 380,
    height: 18,
    borderRadius: 10,
    margin: 10,
    elevation: 5,
    zIndex: 1,
  },
  bar: {
    height: 15,
    backgroundColor: "darkgray",
  },
});

export default ProgressBar;
