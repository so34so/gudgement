import { useEffect, useState } from "react";
import { View, ScrollView, Text, Image, Pressable } from "react-native";
import { CommonType } from "../types/CommonType";
import { AxiosResponse } from "axios";
import { API_URL, IMAGE_URL } from "@env";
import AccountBox from "../components/AccountBox";
import { getAsyncData } from "../utils/common";
import reactotron from "reactotron-react-native";
import fetchApi from "../utils/tokenUtils";

function SettingAccountBox({ numberVisible }: { numberVisible: boolean }) {
  const [tempEmail, setTempEmail] = useState("");
  const [accounts, setAccounts] = useState<CommonType.Taccount[]>([]);
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
        reactotron.log!("이메일 불러오기 성공!", tempEmail);
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
    reactotron.log!("인증된 이메일", tempEmail);
    try {
      const response: AxiosResponse<CommonType.Taccount[]> = await fetchApi.get(
        `${API_URL}/account/${tempEmail}`,
      );
      const responseAccount = response.data;
      setAccounts(responseAccount);
      reactotron.log!("계좌 불러오기 성공!", accounts);
    } catch (error) {
      reactotron.log!("계좌 불러오기 실패!", error);
    }
  };

  const handleSelect = (accountId: number) => {
    setSelectedAccountId(accountId);
    accounts.map(account => {
      if (account.virtualAccountId === accountId) {
        account.selected = !account.selected;
      }
    });
  };

  return (
    <View className="flex w-full justify-start items-center">
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
