import { Animated, Easing, Text, View, Image } from "react-native";
import { CommonType } from "../types/CommonType";
import Svg, { Text as SvgText } from "react-native-svg";
import { useCallback, useEffect, useState } from "react";
import reactotron from "reactotron-react-native";

function RenderItems({
  item,
  page,
  component,
}: {
  item: CommonType.Titem | CommonType.TinvenItem;
  page: number;
  component: string;
}) {
  const [translateY, setTranslateY] = useState(new Animated.Value(-5));
  useEffect(() => {
    // page와 item.id가 같으면 translateY 애니메이션을 서서히 증가시킵니다.
    if (page + 1 === item.typeId) {
      reactotron.log!(page + 1, item.typeId);
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
  }, [page, item.typeId]);
  const itemWidth = useCallback(
    () => (component === "Shop" ? "w-[300px]" : "w-[200px]"),
    [component],
  );
  return (
    <Animated.View
      style={{
        elevation: 5,
        transform: [{ translateY: translateY }], // translateY로 margin-y 적용
      }}
      className={`h-36 mx-[5px] ${itemWidth()} my-8 justify-center items-center bg-white rounded-[10px] flex-row space-x-10`}
    >
      <Image
        source={{
          uri: `${item.image}`,
        }}
        className={`w-[75px] h-16 rounded-xl ${"price" in item && "left-4"}`}
      />
      {"price" in item ? (
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
              x="90"
              y="80"
              textAnchor="middle"
            >
              {item.price || "해금 필요"}
            </SvgText>
          </Svg>
        </View>
      ) : (
        item?.quantity && (
          <Text className="text-black right-2 font-PretendardBlack text-[20px]">
            X {item.quantity}
          </Text>
        )
      )}
    </Animated.View>
  );
}
export default RenderItems;
