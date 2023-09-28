import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import MyPageBackground from "../assets/images/mypageBackground.png";
import MyPageIcon from "../assets/images/mypageIcon.png";
import NavigationButton from "../components/NavigationButton";
import AccountBox from "../components/AccountBox";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "@env";
import Reactotron from "reactotron-react-native";
import CustomModal from "../components/CustomModal";
import { queryClient } from "../../queryClient";

export interface IAccount {
  id: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
  accountHolder: string;
  email: string;
  balance: 231333512000;
  isSelected: boolean;
}

const ACCOUNTS: Array<IAccount> = [
  {
    id: 1,
    bankName: "신한",
    accountName: "신한저축예금",
    accountNumber: "1002-283-1234-1234",
    accountHolder: "강해빈",
    email: "aubrienid@naver.com",
    balance: 231333512000,
    isSelected: false,
  },
  {
    id: 2,
    bankName: "우리",
    accountName: "신한저축예금",
    accountNumber: "1002-283-1234-1234",
    accountHolder: "강해빈",
    email: "aubrienid@naver.com",
    balance: 231333512000,
    isSelected: false,
  },
  {
    id: 3,
    bankName: "하나",
    accountName: "신한저축예금",
    accountNumber: "1002-283-1234-1234",
    accountHolder: "강해빈",
    email: "aubrienid@naver.com",
    balance: 231333512000,
    isSelected: false,
  },
  {
    id: 4,
    bankName: "토스",
    accountName: "신한저축예금",
    accountNumber: "1002-283-1234-1234",
    accountHolder: "강해빈",
    email: "aubrienid@naver.com",
    balance: 231333512000,
    isSelected: false,
  },
  {
    id: 5,
    bankName: "토스",
    accountName: "신한저축예금",
    accountNumber: "1002-283-1234-1234",
    accountHolder: "강해빈",
    email: "aubrienid@naver.com",
    balance: 231333512000,
    isSelected: false,
  },
];

function SettingAccount() {
  const mypageBackground: ImageSourcePropType =
    MyPageBackground as ImageSourcePropType;
  const analysisIcon: ImageSourcePropType = MyPageIcon as ImageSourcePropType;

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const [selectedAccountId, setSelectedAccountId] = useState<number | null>(
    null,
  );

  const handleSelect = (accountId: number) => {
    setSelectedAccountId(accountId);
    ACCOUNTS[accountId - 1].isSelected = !ACCOUNTS[accountId - 1].isSelected;
  };

  const submitSelect = async () => {
    Reactotron.log!(selectedAccountId);
    if (!selectedAccountId) {
      setModalText("계좌를 선택해주세요");
      openModal();
      return;
    }
    if (selectedAccountId !== null) {
      try {
        const response = await axios.post(`${API_URL}/select/accounts`, {
          accountId: ACCOUNTS[selectedAccountId - 1].id,
        });
        Reactotron.log!(response.data);
      } catch (error) {
        Reactotron.log!(error);
        Reactotron.log!("handleSelect", ACCOUNTS[selectedAccountId - 1]);
        // const settingAccountAction = CommonActions.reset({
        //   index: 0,
        //   routes: [{ name: "바텀" }],
        // });
        // navigation.dispatch(settingAccountAction);
        queryClient.invalidateQueries(["fetchUserInfo"]);
      }
    }
  };

  return (
    <View className="flex w-screen h-screen">
      <ImageBackground
        source={mypageBackground}
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
            <View className="overflow-hidden flex flex-col bg-white70 h-fill w-[380px] rounded-3xl border-solid border-[3px] border-darkgray">
              <View className="p-5 flex flex-row items-end justify-between bg-white70 w-fill border-b-[3px] border-darkgray border-solid">
                <View className="gap-4 flex flex-row items-center">
                  <View className="z-10 flex justify-center items-center h-[50px] w-fill p-[3px] bg-white70 border-solid border-[3px] border-darkgray rounded-full">
                    <View className="bg-darkgray h-fill w-fill rounded-full">
                      <Image source={analysisIcon} className="h-10 w-10" />
                    </View>
                  </View>
                  <View className="flex felx-col">
                    <Text className="text-sub01 text-xs font-PretendardExtraBold">
                      연동한 계좌정보는 저희가
                    </Text>
                    <View className="flex flex-row">
                      <Text className="text-darkgray text-xs font-PretendardExtraBold">
                        안전하게 보관
                      </Text>
                      <Text className="text-sub01 text-xs font-PretendardExtraBold">
                        할게요.
                      </Text>
                    </View>
                    <View className="flex flex-row">
                      <Text className="mr-1 text-sub01 text-xs font-PretendardExtraBold">
                        주계좌 1개를
                      </Text>
                      <Text className="text-darkgray text-xs font-PretendardExtraBold">
                        선택
                      </Text>
                      <Text className="text-sub01 text-xs font-PretendardExtraBold">
                        해주세요.
                      </Text>
                    </View>
                  </View>
                </View>
                <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
                  3/3
                </Text>
              </View>
              <ScrollView className="h-[74%] w-fill p-3">
                <View className="mb-6">
                  {ACCOUNTS.map((account: IAccount) => {
                    return (
                      <Pressable
                        key={account.id}
                        onPress={() => {
                          handleSelect(account.id);
                        }}
                      >
                        <AccountBox
                          account={account}
                          isSelected={selectedAccountId === account.id}
                          onSelect={handleSelect}
                        />
                      </Pressable>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
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
