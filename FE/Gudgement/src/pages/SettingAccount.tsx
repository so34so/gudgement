import { useEffect, useState } from "react";
import { View, Text, ImageBackground } from "react-native";
import Config from "react-native-config";

import reactotron from "reactotron-react-native";

import CustomModal from "../components/CustomModal";
import NavigationButton from "../components/NavigationButton";
import SettingAccountBox from "../components/SettingAccountBox";

import fetchApi from "../utils/tokenUtils";
import { getAsyncData } from "../utils/common";

import { queryClient } from "../../queryClient";

function SettingAccount() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getEmail = await getAsyncData<string>("email");
        const email = getEmail;
        if (email) {
          setTempEmail(email);
        }
      } catch (error) {
        reactotron.log!("이메일 불러오기 실패!", error);
      }
    };

    fetchData();
  }, [tempEmail]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleSelectAccountId = (accountId: number) => {
    setSelectedAccountId(accountId);
  };

  const submitSelect = async () => {
    reactotron.log!("선택된 계좌 아이디", selectedAccountId);
    if (!selectedAccountId) {
      setModalText("계좌를 선택해주세요");
      openModal();
      return;
    }

    if (selectedAccountId !== null) {
      const sendBE = {
        email: tempEmail,
        virtualAccountId: selectedAccountId,
      };
      try {
        const response = await fetchApi.post(
          `${Config.API_URL}/account`,
          sendBE,
        );
        reactotron.log!("계좌 연동 성공!", response);
        queryClient.invalidateQueries(["fetchUserInfo"]);
      } catch (error) {
        reactotron.log!("계좌 연동 실패!", error);
      }
    }
  };

  return (
    <View className="flex w-screen h-screen">
      <ImageBackground
        source={{
          uri: `${Config.IMAGE_URL}/asset/mypageBackground.png`,
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
                계좌 연동
              </Text>
            </View>
          </View>
          <View className="flex w-full justify-start items-center">
            <SettingAccountBox
              numberVisible={true}
              selectedAccountId={selectedAccountId}
              setSelectedAccountId={setSelectedAccountId}
              onSelectId={handleSelectAccountId}
            />
          </View>
        </View>
        <View className="z-10 w-full h-fill bottom-0 absolute pb-10 flex justify-end items-center">
          <NavigationButton
            handleFunction={submitSelect}
            text="다 음"
            height="lg"
            width="lg"
            size="md"
            color="deepgreen"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default SettingAccount;
