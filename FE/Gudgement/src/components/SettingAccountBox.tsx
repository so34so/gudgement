import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, Pressable } from "react-native";
import { AxiosResponse } from "axios";
import { Config } from "react-native-config";

import AccountBox from "../components/AccountBox";

import fetchApi from "../utils/tokenUtils";
import { getAsyncData, screenHeight } from "../utils/common";
import { CommonType } from "../types/CommonType";
import reactotron from "reactotron-react-native";

function SettingAccountBox({
  numberVisible,
  selectedAccountId,
  onSelectId,
  setSelectedAccountId,
}: {
  numberVisible: boolean;
  selectedAccountId: number | null;
  onSelectId: (accountId: number) => void;
  setSelectedAccountId: React.Dispatch<React.SetStateAction<number | null>>;
}) {
  const [tempEmail, setTempEmail] = useState("");
  const [accounts, setAccounts] = useState<CommonType.Taccount[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getEmail = await getAsyncData<string>("email");
        const email = getEmail;
        if (email) {
          setTempEmail(email);
        }
      } catch (error) {
        reactotron.log!(error);
      }
    };

    fetchData();

    if (tempEmail.length > 0) {
      handleReadAccount();
    }
  }, [tempEmail]);

  const handleReadAccount = async () => {
    try {
      const response: AxiosResponse<CommonType.Taccount[]> = await fetchApi.get(
        `${Config.API_URL}/account/${tempEmail}`,
      );
      const responseAccount = response.data;

      const selectedAccount = responseAccount.find(account => account.selected);
      if (selectedAccount && selectedAccount.virtualAccountId) {
        setSelectedAccountId(selectedAccount.virtualAccountId);
      }
      setAccounts(responseAccount);
    } catch (error) {
      reactotron.log!(error);
    }
  };

  const handleSelect = (accountId: number) => {
    onSelectId(accountId);
    accounts.map(account => {
      if (account.virtualAccountId === accountId) {
        account.selected = !account.selected;
      }
    });
  };

  return (
    <View
      className="flex w-full h-full justify-start items-center"
      style={{ height: screenHeight - 170 }}
    >
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
          {numberVisible && (
            <Text className="text-darkgray50 text-sm font-PretendardExtraBold">
              3/3
            </Text>
          )}
        </View>
        <ScrollView className="h-[74%] w-fill p-3">
          <View className="mb-6">
            {accounts.map((account: CommonType.Taccount) => {
              return (
                <Pressable
                  key={account.virtualAccountId}
                  onPress={() => {
                    handleSelect(
                      account.virtualAccountId ? account.virtualAccountId : 0,
                    );
                  }}
                >
                  <AccountBox
                    account={account}
                    isSelected={selectedAccountId === account.virtualAccountId}
                    onSelect={handleSelect}
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default SettingAccountBox;
