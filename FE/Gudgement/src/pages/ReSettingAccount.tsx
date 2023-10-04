import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useEffect, useState } from "react";
import { View, ImageBackground } from "react-native";
import { AxiosResponse } from "axios";
import { getAsyncData } from "../utils/common";
import fetchApi from "../utils/tokenUtils";
import CustomModal from "../components/CustomModal";
import NavigationButton from "../components/NavigationButton";
import SettingAccountBox from "../components/SettingAccountBox";
import TagBoxSmall from "../components/TagBoxSmall";
import reactotron from "reactotron-react-native";
import Config from "react-native-config";

function ReSettingAccount() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");
  const [tempEmail, setTempEmail] = useState("");
  const [accounts, setAccounts] = useState<CommonType.Taccount[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null,
  );

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

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

    if (tempEmail.length > 0) {
      handleReadAccount();
    }
  }, [tempEmail]);

  const handleReadAccount = async () => {
    // reactotron.log!("인증된 이메일", tempEmail);
    try {
      const response: AxiosResponse<CommonType.Taccount[]> = await fetchApi.get(
        `${Config.API_URL}/account/${tempEmail}`,
      );
      const responseAccount = response.data;
      setAccounts(responseAccount);
      // reactotron.log!("계좌 불러오기 성공!", accounts);
    } catch (error) {
      reactotron.log!("계좌 불러오기 실패!", error);
    }
  };

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
        /**
         * 계좌 연동까지 끝났으면 fetchUserInfo가 key인 query를 다시
         * 실행시켜서 서버에서 데이터를 받아오도록 했습니다.
         * */
        setModalText("주계좌 설정을 완료했습니다.");
        openModal();
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
        <View className="absolute bg-black30 w-screen h-screen" />
        <CustomModal
          alertText={modalText}
          visible={modalVisible}
          closeModal={() => {
            closeModal();
            if (modalText === "주계좌 설정을 완료했습니다.") {
              navigation.goBack();
            }
          }}
        />
        <View className="z-10 flex flex-col">
          <View className="py-2 flex flex-row justify-between items-center">
            <TagBoxSmall
              text={"주계좌 설정"}
              img={`${Config.IMAGE_URL}/asset/analysisIcon.png`}
            />
          </View>
          <SettingAccountBox
            numberVisible={false}
            selectedAccountId={selectedAccountId}
            setSelectedAccountId={setSelectedAccountId}
            onSelectId={handleSelectAccountId}
          />
        </View>
        <View className="z-10 w-full h-fill bottom-0 absolute pb-10 flex justify-end items-center px-3">
          <NavigationButton
            handleFunction={submitSelect}
            text="설정 완료"
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

export default ReSettingAccount;
