import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Modal,
  Animated,
  TouchableWithoutFeedback,
  Dimensions,
  PanResponder,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import NavigationButton from "./NavigationButton";
import { WithLocalSvg } from "react-native-svg";
import CheckBoxOn from "../assets/icons/checkBoxOn.svg";
import CheckBoxOff from "../assets/icons/checkBoxOff.svg";

interface BottomSheetProps {
  bottomSheetVisible: boolean;
  setBottomSheetVisible: () => void;
}

function BottomSheet({
  bottomSheetVisible,
  setBottomSheetVisible,
}: BottomSheetProps) {
  const screenHeight = Dimensions.get("screen").height;
  const panY = useRef(new Animated.Value(screenHeight)).current;
  const translateY = panY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [0, 0, 1],
  });

  const resetBottomSheet = Animated.timing(panY, {
    toValue: 0,
    duration: 300,
    useNativeDriver: true,
  });

  const closeBottomSheet = Animated.timing(panY, {
    toValue: screenHeight,
    duration: 300,
    useNativeDriver: true,
  });

  const panResponders = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => false,
      onPanResponderMove: (event, gestureState) => {
        panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.vy > 1.5) {
          closeModal();
        } else {
          resetBottomSheet.start();
        }
      },
    }),
  ).current;

  useEffect(() => {
    if (bottomSheetVisible) {
      resetBottomSheet.start();
    }
  }, [bottomSheetVisible]);

  const closeModal = () => {
    closeBottomSheet.start(() => {
      setBottomSheetVisible(false);
    });
  };

  const checkBoxOn: ImageSourcePropType = CheckBoxOn as ImageSourcePropType;
  const checkBoxOff: ImageSourcePropType = CheckBoxOff as ImageSourcePropType;

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [isAgree, setIsAgree] = useState(false);
  const [alertMessageColor, setAlertMessageColor] = useState("text-darkgray");
  const [alertMessage, setAlertMessage] = useState(
    "서비스를 이용하기 위한 동의문이예요.",
  );

  const handleIsAgree = () => {
    setIsAgree(!isAgree);
  };

  const handleAgreement = async () => {
    if (!isAgree) {
      setAlertMessageColor("text-red");
      setAlertMessage("서비스를 이용하기 위한 필수 동의문이예요!");
      return;
    }
    closeModal();
    navigation.navigate("SettingAccount");
  };

  return (
    <Modal
      visible={bottomSheetVisible}
      animationType={"fade"}
      transparent
      statusBarTranslucent
    >
      <View className="z-10 flex flex-1 flex-col justify-start bg-black50">
        <TouchableWithoutFeedback onPress={closeModal}>
          <View className="flex flex-1" />
        </TouchableWithoutFeedback>
        <Animated.View
          className="h-[300px] flex justify-start items-center bg-white70 rounded-t-3xl border-[3px] border-darkgray border-solid"
          style={{
            transform: [{ translateY: translateY }],
          }}
          {...panResponders.panHandlers}
        >
          <View className="flex px-4">
            <View className="m-7 p-[2px] flex flex-row h-fill w-[140px] justify-center items-center bg-white70 border-solid border-[3px] rounded-xl border-darkgray">
              <Text className="py-1 px-2 w-full text-center bg-darkgray rounded-lg text-white text-xs font-PretendardExtraBold">
                동의문 안내
              </Text>
            </View>
          </View>
          <View className="-mt-5 flex flex-col justify-center items-start bg-white w-[370px] p-4 border-[3px] border-darkgray border-solid rounded-xl">
            <Text
              className={`${alertMessageColor} text-2xs font-PretendardExtraBold mr-8 mb-2 pb-3 border-b-[2px] border-sub03 border-solid w-full`}
            >
              {alertMessage}
            </Text>
            <View className="flex flex-row justify-center items-center px-6 py-1">
              <View className="flex flex-col justify-center items-start mr-14">
                <Text className="text-darkgray text-xs font-PretendardExtraBold pb-1">
                  개인신용정보 수집 및 이용 동의
                </Text>
                <Text className="text-darkgray50 text-2xs font-PretendardExtraBold">
                  동의문 상세보기 {">"}
                </Text>
              </View>
              <Pressable onPress={handleIsAgree}>
                {isAgree ? (
                  <WithLocalSvg width={40} height={40} asset={checkBoxOn} />
                ) : (
                  <WithLocalSvg width={40} height={40} asset={checkBoxOff} />
                )}
              </Pressable>
            </View>
          </View>
          <View className="z-10 w-full h-fill absolute bottom-0 pb-4 flex justify-end items-center">
            <NavigationButton
              handleFunction={() => handleAgreement()}
              text="다 음"
              height="lg"
              width="lg"
              size="md"
              color="deepgreen"
            />
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
}

export default BottomSheet;
