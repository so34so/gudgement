import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import {
  View,
  ImageBackground,
  ActivityIndicator,
  Text,
  Image,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useQuery } from "@tanstack/react-query";
import { CommonType } from "../types/CommonType";
import { API_URL, IMAGE_URL } from "@env";
import NavigationButton from "../components/NavigationButton";
import CustomModal from "../components/CustomModal";
import reactotron from "reactotron-react-native";
import TagBoxSmall from "../components/TagBoxSmall";
import { getAsyncData } from "../utils/common";
import axios from "axios";

function AnalyzeGoal() {
  const {
    data: userData,
    error: fetchError,
    isLoading,
    refetch,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [goal, setGoal] = useState("");
  const [isGoal, setIsGoal] = useState(0);

  const currentDate = new Date();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

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
  if (fetchError) {
    reactotron.log!(fetchError);
  } else {
    reactotron.log!("홈 사용자 정보", userData);
  }

  const handleInputChange = (value: string) => {
    const numValue = parseInt(value.replace(/,/g, ""), 10);
    if (!isNaN(numValue)) {
      setGoal(numValue.toLocaleString());
    } else {
      setGoal("");
    }
  };

  const handleFetchGoal = async (currentGoal: string) => {
    const numValue = currentGoal.replace(/,/g, "");
    if (!numValue.trim()) {
      setModalText("목표 금액을 입력해주세요.");
      openModal();
      return;
    }
    const numGoal = Number(numValue);
    reactotron.log!(numGoal);
    const getAccessToken = await getAsyncData<string>("accessToken");
    try {
      const response = await axios.put(
        `${API_URL}/mypage/update/${numGoal}`,
        {
          monthOverConsumption: numGoal,
        },
        {
          headers: {
            Authorization: `Bearer ${getAccessToken}`,
          },
        },
      );
      reactotron.log!("목표 금액 설정 성공!", response);
      setGoal("");
      setModalText(
        `목표 금액이 ${numGoal.toLocaleString("ko-KR")}원으로 설정되었습니다.`,
      );
      openModal();
    } catch (error) {
      // const axiosError = error as AxiosError<CommonType.Terror>;
      // if (axiosError.response) {
      //   const errorMessage = axiosError.response.data.message;
      //   setModalText(errorMessage);
      //   openModal();
      // }
      reactotron.log!("목표 금액 설정 실패!", error);
    }
  };

  return (
    <View className="w-full h-full flex justify-center items-center">
      <ImageBackground
        source={{
          uri: `${IMAGE_URL}/asset/mypageBackground.png`,
        }}
        resizeMode="cover"
        className="flex w-full h-full"
      >
        <CustomModal
          alertText={modalText}
          visible={modalVisible}
          closeModal={closeModal}
        />
        <View className="absolute bg-black30 w-screen h-screen" />
        <View className="flex flex-row justify-between items-center">
          <TagBoxSmall
            text={`${userData?.nickname} 님의 소비 목표 금액 설정`}
            img={`${IMAGE_URL}/asset/analysisIcon.png`}
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
                        uri: `${IMAGE_URL}/asset/mypageIcon.png`,
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
                    내정보의 소비 분석에서
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
                {isGoal === 0 ? "0" : "1"}/1
              </Text>
            </View>
            <View className="h-fill w-fill">
              <SafeAreaView className="mx-4 w-fit">
                <View className="flex flex-row mt-4 mb-3 w-full justify-around items-center">
                  <TextInput
                    onChangeText={handleInputChange}
                    value={goal}
                    placeholder="ex) 500000"
                    placeholderTextColor="darkgray"
                    keyboardType="numeric"
                    className="h-[58px] w-[230px] p-4 mr-2 bg-white rounded-xl border-solid border-[3px] border-darkgray text-darkgray text-sm font-PretendardExtraBold"
                  />
                  <NavigationButton
                    handleFunction={() => handleFetchGoal(goal)}
                    text="목표 설정"
                    height="lg"
                    width="sm"
                    size="md"
                    color="bluesky"
                  />
                </View>
                <View className="w-full">
                  {isGoal === 0 ? (
                    <Text className="text-darkgray70 text-xs font-PretendardExtraBold px-4 pb-4">
                      숫자만 입력해주세요.
                    </Text>
                  ) : (
                    <Text className="text-sky text-xs font-PretendardExtraBold px-4 pb-4">
                      이미 {currentDate.getFullYear()}년{" "}
                      {currentDate.getMonth() + 1}월 목표 금액이 설정되었습니다.
                    </Text>
                  )}
                </View>
              </SafeAreaView>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

export default AnalyzeGoal;
