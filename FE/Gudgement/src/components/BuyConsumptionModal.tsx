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
import CloseIcon from "../assets/icons/closeModal.svg";
import { CommonType } from "../types/CommonType";
import Slider from "@react-native-community/slider";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { IresponseParams, MEMBER_ID } from "../pages/Shop";

function BuyConsumptionModal({
  item,
  modalVisible,
  setModalVisible,
  quantity,
  setQuantity,
  buyConsumable,
}: {
  item?: CommonType.Titem;
  modalVisible: {
    buy?: boolean;
    complete: boolean;
  };
  setModalVisible: React.Dispatch<
    React.SetStateAction<{
      buy?: boolean;
      complete: boolean;
    }>
  >;
  quantity: number;
  setQuantity: React.Dispatch<number>;
  buyConsumable: UseMutateFunction<
    AxiosResponse<unknown, unknown>,
    unknown,
    IresponseParams,
    unknown
  >;
}) {
  const closeModal: ImageSourcePropType = CloseIcon as ImageSourcePropType;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible.buy}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible({
          ...modalVisible,
          buy: !modalVisible.buy,
        });
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
            className="absolute right-1 top-1"
            onPress={() =>
              setModalVisible({
                ...modalVisible,
                buy: !modalVisible.buy,
              })
            }
          >
            <WithLocalSvg width={40} height={40} asset={closeModal} />
          </Pressable>
          <View className="h-6" />
          <Text className="text-white text-[16px] font-PretendardExtraBold">
            {item?.itemContent}
          </Text>
          <Text className="text-main text-[32px] font-PretendardExtraBold">
            {item?.itemName}
          </Text>
          {/* {item?.image && (
            <WithLocalSvg
              className="left-4 top-6"
              width={220}
              height={200}
              asset={item?.image as ImageSourcePropType}
            />
          )} */}
          <Svg height="80" width="140">
            <SvgText
              fill="#ffb800"
              stroke="black"
              strokeWidth={2}
              fontSize="28"
              fontFamily="Pretendard-ExtraBold"
              x="44"
              y="30"
              textAnchor="middle"
            >
              {item?.price} 티끌
            </SvgText>
          </Svg>

          <Slider
            style={{ width: 200, height: 40 }}
            minimumValue={0}
            maximumValue={10}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="#000000"
            value={quantity}
            step={1}
            onValueChange={setQuantity}
          />
          <Text className="py-5 font-PretendardBlack text-[20px]">
            {quantity} 개
          </Text>

          <TouchableOpacity
            className="w-32 flex justify-center items-center h-12 bg-buy rounded-[10px] border-2 border-[#6f530d]"
            onPress={() => {
              setModalVisible({ ...modalVisible, buy: !modalVisible.buy });
              buyConsumable({
                itemId: item!.id,
                memberId: MEMBER_ID,
                quantity: quantity,
              });
              setQuantity(0);
            }}
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
export default BuyConsumptionModal;
