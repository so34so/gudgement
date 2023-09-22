import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  ImageSourcePropType,
  Image,
} from "react-native";
import MyPageBackground from "../assets/images/mypageBackground.png";
import MyPageIcon from "../assets/images/mypageIcon.png";
import NavigationButton from "../components/NavigationButton";
import AccountBox from "../components/AccountBox";
import { useState } from "react";

const accounts = [1, 2, 3, 4, 5, 6];

export interface IAccount {
  id: number;
  isSelect: boolean;
}
function SettingAccount() {
  const mypageBackground: ImageSourcePropType =
    MyPageBackground as ImageSourcePropType;
  const analysisIcon: ImageSourcePropType = MyPageIcon as ImageSourcePropType;

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [isSelectedAccount, setIsSelectedAccount] = useState<
    ArrayLike<IAccount>
  >(
    accounts.map((ele: number) => {
      return { id: ele, isSelect: false };
    }),
  );

  return (
    <View className="flex">
      <ImageBackground
        source={mypageBackground}
        resizeMode="cover"
        className="flex w-screen h-screen"
      >
        <View className="z-10 flex flex-col">
          <View className="flex justify-between items-center px-4">
            <View className="m-7 p-[2px] flex flex-row h-fill w-[140px] justify-center items-center bg-white70 border-solid border-[3px] rounded-xl border-darkgray">
              <Text className="py-1 px-2 w-full text-center bg-darkgray rounded-lg text-white text-sm font-PretendardExtraBold">
                계좌 연동
              </Text>
            </View>
          </View>
          <View className="flex w-full justify-center items-center">
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
              <ScrollView className="h-[570px] w-fill p-3">
                <View className="mb-6">
                  {accounts.map((e: number) => {
                    return (
                      <AccountBox
                        key={e}
                        bank={"우리은행"}
                        accountName={"우리은행저축예금"}
                        accountNumber={"1002-***-****-****"}
                        accountMoney={"잔액 10,230원"}
                        accountId={e}
                      />
                    );
                  })}
                </View>
              </ScrollView>
            </View>
          </View>
        </View>
        <View className="z-0 w-full h-full absolute pb-10 flex justify-end items-center">
          <NavigationButton
            screenName="SettingName"
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
