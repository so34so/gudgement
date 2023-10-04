import { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ImageBackground,
  Image,
} from "react-native";
import Reactotron from "reactotron-react-native";
import { API_URL, IMAGE_URL } from "@env";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { getAsyncData } from "../utils/common";
import CustomModal from "../components/CustomModal";
import AgreeBottomSheet from "../components/AgreeBottomSheet";
import NavigationButton from "../components/NavigationButton";
import fetchApi from "../utils/tokenUtils";

function SettingName() {
  const [name, setName] = useState("");
  const [checkName, setCheckName] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  useEffect(() => {
    const getLoginData = async () => {
      const getId = await getAsyncData<number>("id");
      if (getId) {
        setTempId(getId);
      }
    };
    getLoginData();
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleFetchCheckName = async (currentName: string) => {
    const nickName = currentName.trim();
    if (nickName.length > 6 || nickName.length < 1) {
      setCheckName(1);
      return;
    }
    try {
      const response = await fetchApi.post(
        `${API_URL}/member/valid/nickname?nickname=${nickName}`,
      );
      Reactotron.log!("닉네임 중복 확인 성공!", response.data);
      if (response.data === true) {
        setCheckName(2);
      }
      if (response.data === false) {
        setCheckName(3);
      }
    } catch (error) {
      setCheckName(4);
      Reactotron.log!("닉네임 중복 확인 실패!", error);
    }
  };

  const handleFetchName = async (currentName: string) => {
    setBottomSheetVisible(false);
    if (checkName !== 2) {
      setModalText("닉네임 설정을 다시 확인해주세요.");
      openModal();
      return;
    }
    if (checkName === 2) {
      try {
        const response = await fetchApi.post(
          `${API_URL}/member/update/nickname?id=${tempId}&nickname=${currentName}`,
        );
        Reactotron.log!("닉네임 등록 성공!", response.data);
        setBottomSheetVisible(true);
      } catch (error) {
        setCheckName(4);
        Reactotron.log!("닉네임 등록 실패!", error);
      }
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
                  닉네임 설정
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
                      <Text className="mr-1 text-sub01 text-xs font-PretendardExtraBold">
                        닉네임은 다른 사용자에게 공개되며
                      </Text>
                      <Text className="text-sub01 text-xs font-PretendardExtraBold">
                        한글, 영문, 숫자를 포함하여
                      </Text>
                      <View className="flex flex-row">
                        <Text className="text-darkgray text-xs font-PretendardExtraBold">
                          6글자 이하
                        </Text>
                        <Text className="text-sub01 text-xs font-PretendardExtraBold">
                          로 설정해주세요.
                        </Text>
                      </View>
                    </View>
                  </View>
                  <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
                    2/3
                  </Text>
                </View>
                <View className="h-fill w-fill">
                  <SafeAreaView className="mx-4 w-fit">
                    <View className="flex flex-row mt-4 mb-3 w-full justify-around items-center">
                      <TextInput
                        onChangeText={newName => {
                          const nickName = newName.trim();
                          setName(nickName);
                          if (nickName.length > 6) {
                            setCheckName(1);
                          } else if (nickName.length < 1) {
                            setCheckName(0);
                          } else {
                            setCheckName(5);
                          }
                        }}
                        value={name}
                        placeholder="닉네임"
                        placeholderTextColor="darkgray"
                        className="h-[60px] w-[230px] p-4 mr-2 bg-white rounded-xl border-solid border-[3px] border-darkgray text-darkgray text-sm font-PretendardExtraBold"
                      />
                      <NavigationButton
                        handleFunction={() => handleFetchCheckName(name.trim())}
                        text="중복 확인"
                        height="lg"
                        width="sm"
                        size="md"
                        color="bluesky"
                      />
                    </View>
                    {checkName === 0 ? (
                      <Text className="text-darkgray50 text-xs font-PretendardExtraBold px-4 pb-4">
                        닉네임을 입력해주세요.
                      </Text>
                    ) : null}
                    {checkName === 1 ? (
                      <Text className="text-red text-xs font-PretendardExtraBold px-4 pb-4">
                        1글자 이상 6글자 이하로 입력해주세요.
                      </Text>
                    ) : null}
                    {checkName === 2 ? (
                      <Text className="text-sky text-xs font-PretendardExtraBold px-4 pb-4">
                        멋진 닉네임이네요!
                      </Text>
                    ) : null}
                    {checkName === 3 ? (
                      <Text className="text-red text-xs font-PretendardExtraBold px-4 pb-4">
                        중복된 닉네임이예요.
                      </Text>
                    ) : null}
                    {checkName === 4 ? (
                      <Text className="text-red text-xs font-PretendardExtraBold px-4 pb-4">
                        다시 시도해주세요.
                      </Text>
                    ) : null}
                    {checkName === 5 ? (
                      <Text className="text-darkgray50 text-xs font-PretendardExtraBold px-4 pb-4">
                        닉네임 중복 확인해주세요.
                      </Text>
                    ) : null}
                  </SafeAreaView>
                </View>
              </View>
            </View>
          </View>
          <View className="z-10 w-full h-fill absolute bottom-0 pb-10 flex justify-end items-center">
            <NavigationButton
              handleFunction={() => handleFetchName(name)}
              text="다 음"
              height="lg"
              width="lg"
              size="md"
              color="deepgreen"
            />
          </View>
        </ImageBackground>
        <AgreeBottomSheet
          bottomSheetVisible={bottomSheetVisible}
          setBottomSheetVisible={setBottomSheetVisible}
        />
      </KeyboardAwareScrollView>
    </View>
  );
}

export default SettingName;
