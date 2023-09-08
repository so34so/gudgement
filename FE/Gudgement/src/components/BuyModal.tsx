import React from "react";
import {
  Alert,
  ImageSourcePropType,
  Modal,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import Svg, { WithLocalSvg, Text as SvgText } from "react-native-svg";
interface Iitem {
  title: string;
  description: string;
  image: ImageSourcePropType;
  price: number;
}
function BuyModal({
  item,
  modalVisible,
  setModalVisible,
}: {
  item: Iitem;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const shoesImage: ImageSourcePropType = item.image;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
      className="opacity-80"
    >
      <View
        className="flex flex-1 justify-start items-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <View className="mt-[43%] bg-sub01 rounded-[20px] px-10 py-8 border-2 border-white items-center shadow-lg">
          <Pressable
            className="absolute right-3 top-2 bg-red border-2 border-black rounded-[10px]"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="py-[2px] px-2 font-PretendardExtraBold">X</Text>
          </Pressable>
          <Text className="text-white text-[16px] font-PretendardExtraBold">
            {item.description}
          </Text>
          <Text className="text-main text-[32px] font-PretendardExtraBold">
            {item.title}
          </Text>
          <WithLocalSvg
            className="left-4 top-6"
            width={220}
            height={200}
            asset={shoesImage}
          />
          <Svg height="80" width="140">
            <SvgText
              fill="#ffb800"
              stroke="black"
              strokeWidth={2}
              fontSize="32"
              fontFamily="Pretendard-ExtraBold"
              x="70"
              y="30"
              textAnchor="middle"
            >
              {item.price}
            </SvgText>
          </Svg>
          <TouchableOpacity
            className="w-32 flex justify-center items-center h-12 bg-buy rounded-[10px] border-2 border-[#6f530d]"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Text className="font-PretendardExtraBold text-black text-[24px] top-[-1]">
              구매하기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
export default BuyModal;
