import {
  FlatList,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";
import RenderItems from "./RenderItems";
import { CommonType } from "../types/CommonType";

interface ICarousel {
  gap: number;
  offset: number;
  items?: CommonType.Titem[] | CommonType.TinvenItem[];
  pageWidth: number;
  setSelectItem: React.Dispatch<React.SetStateAction<number>>;
  component: string;
  category: string | null;
}

function Carousel({
  offset,
  pageWidth,
  gap,
  items,
  setSelectItem,
  component,
  category,
}: ICarousel) {
  const [page, setPage] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const renderItem: ListRenderItem<
    CommonType.Titem | CommonType.TinvenItem
  > = ({ item }) => {
    return <RenderItems item={item} page={page} component={component} />;
  };
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / (pageWidth + gap),
    );
    setPage(newPage);
    setSelectItem(newPage);
  };
  const setIndicatorColor = (index: number) => {
    if (index === page) {
      return "bg-white";
    }
    return "bg-gray-400";
  };
  useEffect(() => {
    flatListRef.current!.scrollToOffset({ animated: false, offset: 0 });
    setPage(0);
    setSelectItem(0);
  }, [category]);
  return (
    <View className="flex justify-center items-center">
      <FlatList
        ref={flatListRef}
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{
          paddingHorizontal: offset + gap / 2,
        }}
        data={items}
        decelerationRate="fast"
        horizontal
        keyExtractor={(item: CommonType.Titem | CommonType.TinvenItem) =>
          `${item.typeId}`
        }
        onScroll={onScroll}
        pagingEnabled
        renderItem={renderItem}
        snapToInterval={pageWidth + gap}
        snapToAlignment="start"
        ListEmptyComponent={() => (
          <Text className="mt-20 font-PretendardBlack text-[20px] text-white">
            상품이 없습니다.
          </Text>
        )}
        showsHorizontalScrollIndicator={false}
      />
      <View className="w-full justify-center h-fit flex flex-row items-center mt-2 space-x-4">
        {items ? (
          Array.from({ length: items.length }, (_, i) => i).map(i => (
            <View
              key={`indicator_${i}`}
              className={`${setIndicatorColor(i)} w-2 h-2 rounded-full`}
            />
          ))
        ) : (
          <View />
        )}
      </View>
    </View>
  );
}

export default Carousel;
