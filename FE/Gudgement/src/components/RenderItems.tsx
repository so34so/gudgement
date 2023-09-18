import { Animated, Easing, View } from "react-native";
import { CommonType } from "../types/CommonType";
import Svg, { Text as SvgText } from "react-native-svg";
import { useEffect, useState } from "react";

function RenderItems({
  item,
  page,
  component,
}: {
  item: CommonType.Titem;
  page: number;
  component: string;
}) {
  const [translateY, setTranslateY] = useState(new Animated.Value(-5));
  useEffect(() => {
    // page와 item.id가 같으면 translateY 애니메이션을 서서히 증가시킵니다.
    if (page === item.id) {
      Animated.timing(translateY, {
        toValue: -16, // 원하는 margin 값으로 변경
        duration: 100, // 애니메이션 지속 시간 (밀리초)
        easing: Easing.inOut(Easing.ease), // 애니메이션 이징 설정
        useNativeDriver: false, // 네이티브 드라이버 사용 여부
      }).start();
    } else {
      // page와 item.id가 다르면 translateY를 0으로 리셋합니다.
      setTranslateY(new Animated.Value(-5));
    }
  }, [page, item.id]);
  const itemWidth = component === "Shop" ? "w-[300px]" : "w-[200px]";
  return (
    <Animated.View
      style={{
        elevation: 5,
        transform: [{ translateY: translateY }], // translateY로 margin-y 적용
      }}
      className={`h-36 mx-[5px] ${itemWidth} my-8 justify-center items-center bg-white rounded-[10px] flex-row space-x-10`}
    >
      <View className="w-16 h-16 bg-black rounded-xl" />
      {component === "Shop" ? (
        <View className="flex-col items-center">
          <Svg width={160} height={100}>
            <SvgText
              fill="white"
              stroke="black"
              fontSize="24"
              fontFamily="Pretendard-ExtraBold"
              x="90"
              y="40"
              textAnchor="middle"
            >
              {item.itemName}
            </SvgText>
            <SvgText
              fill="#ffb800"
              stroke="black"
              fontSize="20"
              fontFamily="Pretendard-ExtraBold"
              x="110"
              y="80"
              textAnchor="middle"
            >
              {item.price}
            </SvgText>
          </Svg>
        </View>
      ) : null}
    </Animated.View>
  );
}
export default RenderItems;
