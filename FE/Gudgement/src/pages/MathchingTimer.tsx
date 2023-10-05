import React, { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";

export default function MathchingTimer() {
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setElapsedTime(prevTime => prevTime + 1);
    }, 1000);

    // 컴포넌트가 언마운트될 때 인터벌 정리
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Text
      style={styles.elapsedTimeText}
      className="rounded-lg text-white text-[44px] font-PretendardExtraBold"
    >
      {formatElapsedTime(elapsedTime)}
    </Text>
  );
}

// 경과 시간을 MM:SS 형식으로 포맷하는 함수
function formatElapsedTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${padWithZero(minutes)}:${padWithZero(remainingSeconds)}`;
}

// 숫자를 두 자릿수로 맞춰줍니다 (0을 추가)
function padWithZero(number: number) {
  return number.toString().padStart(2, "0");
}

const styles = StyleSheet.create({
  elapsedTimeText: {
    top: "73%",
    zIndex: 9,
    left: "6%",
  },
});
