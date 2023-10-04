import { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  Text,
  Image,
  TextInput,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import reactotron from "reactotron-react-native";

import CustomModal from "../components/CustomModal";
import NavigationButton from "../components/NavigationButton";
import TagBoxSmall from "../components/TagBoxSmall";

import fetchApi from "../utils/tokenUtils";
import { Config } from "react-native-config";

import { CommonType } from "../types/CommonType";

function AnalyzeGoal() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [goal, setGoal] = useState("");

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  useEffect(() => {
    if (userData?.monthOverconsumption) {
      setGoal(userData.monthOverconsumption.toLocaleString("ko-KR") + " 원");
    }
  }, [userData?.monthOverconsumption]);

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  const isGoal = userData?.monthOverconsumption;

  const currentDate = new Date();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleInputChange = (value: string) => {
    const numValue = parseInt(value.replace(/,/g, ""), 10);
    if (!isNaN(numValue)) {
      setGoal(numValue.toLocaleString("ko-KR"));
    } else {
      setGoal("");
    }
  };

  const handleFetchGoal = async (currentGoal: string) => {
    if (isGoal !== null) {
      setModalText(
        `목표 금액이 이미 ${Number(isGoal).toLocaleString(
          "ko-KR",
        )}원으로 설정되었습니다.`,
      );
      openModal();
      return;
    }
    const numValue = currentGoal.replace(/,/g, "");
    if (!numValue.trim()) {
      setModalText("목표 금액을 입력해주세요.");
      openModal();
      return;
    }
    const numGoal = Number(numValue);
    reactotron.log!(numGoal);
    try {
      const response = await fetchApi.put(
        `${Config.API_URL}/mypage/update/${numGoal}`,
        {
          monthOverConsumption: numGoal,
        },
      );
      reactotron.log!("목표 금액 설정 성공!", response);
      setModalText(
        `목표 금액이 ${numGoal.toLocaleString("ko-KR")}원으로 설정되었습니다.`,
      );
      openModal();
    } catch (error) {
      reactotron.log!("목표 금액 설정 실패!", error);
      setModalText("목표 금액 설정 중 오류가 발생했습니다. 다시 시도해주세요.");
      openModal();
    }
  };

  return (
    <View className="w-full h-full flex justify-center items-center">
      <ImageBackground
        source={{
          uri: `${Config.IMAGE_URL}/asset/mypageBackground.png`,
        }}
        resizeMode="cover"
        className="flex w-full h-full"
      >
        <CustomModal
          alertText={modalText}
          visible={modalVisible}
          closeModal={() => {
            closeModal();
            if (modalText === `목표 금액이 ${goal}원으로 설정되었습니다.`) {
              navigation.goBack();
            }
          }}
        />
        <View className="absolute bg-black30 w-screen h-screen" />
        <View className="py-2 flex flex-row justify-between items-center">
          <TagBoxSmall
            text={`${userData?.nickname} 님의 소비 목표 금액`}
            img={`${Config.IMAGE_URL}/asset/analysisIcon.png`}
          />
        </View>

        <View className="flex w-full justify-center items-center">
          <View className="overflow-hidden flex flex-col bg-white70 h-fill w-[380px] rounded-3xl border-solid border-[3px] border-darkgray">
            <View className="p-5 flex flex-row items-end justify-between bg-white70 w-fill border-b-[3px] border-darkgray border-solid">
              <View className="gap-4 flex flex-row items-center">
                <View className="z-10 flex justify-center items-center h-[50px] w-fill p-[3px] bg-white70 border-solid border-[3px] border-darkgray rounded-full">
                  <View className="bg-darkgray h-fill w-fill rounded-full">
                    <Image
                      source={{
                        uri: `${Config.IMAGE_URL}/asset/mypageIcon.png`,
                      }}
                      className="h-10 w-10"
                    />
                  </View>
                </View>
                <View className="flex felx-col">
                  <Text className="mr-1 text-sub01 text-xs font-PretendardExtraBold">
                    목표 금액은 한 달에 한 번 설정하면
                  </Text>
                  <Text className="text-sub01 text-xs font-PretendardExtraBold">
                    내 정보의 소비 분석에서
                  </Text>
                  <View className="flex flex-row">
                    <Text className="text-darkgray text-xs font-PretendardExtraBold">
                      분석 결과
                    </Text>
                    <Text className="text-sub01 text-xs font-PretendardExtraBold">
                      를 확인할 수 있어요.
                    </Text>
                  </View>
                </View>
              </View>
              <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
                {isGoal === null ? "0" : "1"}/1
              </Text>
            </View>
            <View className="h-fill w-fill px-4">
              <View className="flex flex-row mt-4 mb-3 justify-center items-center">
                <TextInput
                  onChangeText={handleInputChange}
                  value={goal}
                  placeholder="ex) 500000"
                  placeholderTextColor="darkgray"
                  keyboardType="numeric"
                  className="h-[58px] w-full p-4 bg-white rounded-xl border-solid border-[3px] border-darkgray text-darkgray text-sm font-PretendardExtraBold"
                  editable={userData?.monthOverconsumption === null}
                />
              </View>
              <View className="w-full px-2">
                {isGoal === null ? (
                  <Text className="text-darkgray70 text-xs font-PretendardExtraBold pb-4">
                    숫자만 입력해주세요.
                  </Text>
                ) : (
                  <Text className="text-sky text-xs font-PretendardExtraBold pb-4">
                    이달 {currentDate.getMonth() + 1}월 목표 금액이 이미
                    설정되었습니다.
                  </Text>
                )}
              </View>
            </View>
          </View>
        </View>
        <View className="z-10 w-full h-fill bottom-0 absolute pb-4 flex justify-end items-center">
          <NavigationButton
            handleFunction={() => handleFetchGoal(goal)}
            text="설정 완료"
            height="lg"
            width="lg"
            size="md"
            color="bluesky"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default AnalyzeGoal;
