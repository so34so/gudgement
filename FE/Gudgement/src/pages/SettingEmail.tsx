import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
  Pressable,
} from "react-native";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL, IMAGE_URL } from "@env";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { getAsyncData, updateAsyncData } from "../utils/common";
import CustomModal from "../components/CustomModal";
import NavigationButton from "../components/NavigationButton";
import reactotron from "reactotron-react-native";

function SettingEmail() {

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [tempId, setTempId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  useEffect(() => {
    const getLoginData = async () => {
      const loginData = (await getAsyncData(
        "loginData",
      )) as CommonType.TloginData;

      setTempId(loginData.id);
    };
    getLoginData();
  }, []);

  useEffect(() => {
    const info = {
      info: 1,
    };
    updateAsyncData("loginData", info);
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const isValidEmail = (currentEmail: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(currentEmail);
  };

  const handleFetchEmail = async (currentEmail: string) => {
    if (!isValidEmail(currentEmail)) {
      setModalText("이메일 형식을 확인해주세요.");
      openModal();
      return;
    }
    setModalText("로딩 중...");
    openModal();

    reactotron.log!("저장된 id", tempId);
    const sendBE = {
      id: tempId,
      email: currentEmail,
    };
    try {
      const response: AxiosResponse<CommonType.TemailCode> = await axios.post(
        `${API_URL}/member/email/send`,
        sendBE,
      );
      if (response.status === 200) {
        const mailCode = response.data.toString();
        setCheckNumber(mailCode);
        setEmail(currentEmail);
        setModalText("이메일로 전송된 인증 코드를 입력하세요.");
        openModal();
      }
    } catch (error) {
      const axiosError = error as AxiosError<CommonType.Terror>;
      if (axiosError.response) {
        const errorMessage = axiosError.response.data.message;
        setModalText(errorMessage);
        openModal();
      }
    }
  };

  const updateLoginData = async () => {
    try {
      const loginData = {
        email: email,
      };
      await updateAsyncData("loginData", loginData);
      return email; // 업데이트된 이메일 반환
    } catch (error) {
      reactotron.log!(error);
      return null; // 에러 발생 시 null 반환
    }
  };

  const handleFetchNumber = async (currentNumber: string) => {
    if (currentNumber.length === 0) {
      setModalText("이메일로 전송된 인증 코드를 입력하세요.");
      openModal();
      return;
    }
    if (checkNumber === currentNumber) {
      try {
        const sendBE = {
          id: tempId,
          email: email,
        };
        const response: AxiosResponse<CommonType.TemailUpdate[]> =
          await axios.post(`${API_URL}/member/update/email`, sendBE);
        if (response.status === 200) {
          setCheckNumber("");
          setNumber("");
          setEmail("");
          await updateLoginData();
          navigation.navigate("SettingName");
        }
      } catch (error) {
        const axiosError = error as AxiosError<{
          httpStatus: string;
          code: string;
          message: string;
        }>;
        if (axiosError.response) {
          const errorMessage = axiosError.response.data.message;
          setCheckNumber("");
          setNumber("");
          setModalText(errorMessage);
          openModal();
        }
        reactotron.log!("인증 메일 등록 실패!", error);
      }
    } else {
      setCheckNumber("");
      setNumber("");
      setModalText("인증 코드를 다시 확인해주세요.");
      openModal();
    }
  };

  return (
    <View className="flex w-screen h-screen">
      <KeyboardAwareScrollView>
        <ImageBackground
          source={{
            uri: `${IMAGE_URL}/asset/mypageBackground.png`,
          }}
          resizeMode="cover"
          className="flex w-screen h-screen"
        >
          <CustomModal
            alertText={modalText}
            visible={modalVisible}
            closeModal={closeModal}
          />
          <View className="z-10 flex flex-col">
            <View className="flex justify-between items-center px-4">
              <View className="m-7 p-[2px] flex flex-row h-fill w-[140px] justify-center items-center bg-white70 border-solid border-[3px] rounded-xl border-darkgray">
                <Text className="py-1 px-2 w-full text-center bg-darkgray rounded-lg text-white text-sm font-PretendardExtraBold">
                  본인 인증
                </Text>
              </View>
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
                      <View className="flex flex-row">
                        <Text className="mr-1 text-sub01 text-xs font-PretendardExtraBold">
                          인증된 이메일정보는
                        </Text>
                        <Text className="text-darkgray text-xs font-PretendardExtraBold">
                          안전하게
                        </Text>
                      </View>
                      <View className="flex flex-row">
                        <Text className="text-darkgray text-xs font-PretendardExtraBold">
                          보관
                        </Text>
                        <Text className="text-sub01 text-xs font-PretendardExtraBold">
                          되며 다른 사용자에게
                        </Text>
                      </View>
                      <Text className="text-sub01 text-xs font-PretendardExtraBold">
                        공개되지 않아요.
                      </Text>
                    </View>
                  </View>
                  <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
                    1/3
                  </Text>
                </View>
                <View className="h-fill w-fill">
                  <SafeAreaView className="mx-4 w-fit">
                    <View className="flex flex-row mt-4 mb-3 w-full justify-around items-center">
                      <TextInput
                        onChangeText={setEmail}
                        value={email}
                        placeholder="이메일"
                        placeholderTextColor="darkgray"
                        className="h-[60px] w-[230px] p-4 mr-2 bg-white rounded-xl border-solid border-[3px] text-darkgray border-darkgray text-sm font-PretendardExtraBold"
                      />
                      <NavigationButton
                        handleFunction={() => handleFetchEmail(email.trim())}
                        text="인증받기"
                        height="lg"
                        width="sm"
                        size="md"
                        color="bluesky"
                      />
                    </View>
                    <TextInput
                      onChangeText={setNumber}
                      value={number}
                      placeholder="인증 번호"
                      placeholderTextColor="darkgray"
                      keyboardType="numeric"
                      className="h-[60px] bt-3 mb-4 p-4 bg-white rounded-xl border-solid border-[3px] border-darkgray text-darkgray text-sm font-PretendardExtraBold"
                    />
                  </SafeAreaView>
                </View>
              </View>
            </View>
          </View>
          <Pressable className="z-0 w-full h-full absolute pb-10 flex justify-end items-center">
            <NavigationButton
              handleFunction={() => handleFetchNumber(number.trim())}
              text="다 음"
              height="lg"
              width="lg"
              size="md"
              color="deepgreen"
            />
          </Pressable>
        </ImageBackground>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default SettingEmail;
