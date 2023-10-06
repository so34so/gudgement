import { View, Text, Image, Pressable } from "react-native";
import { SvgUri } from "react-native-svg";
import Config from "react-native-config";

import { CommonType } from "../types/CommonType";

interface AccountBoxProps {
  account: CommonType.Taccount;
  isSelected: boolean;
  onSelect: (accountId: number) => void;
}

function AccountBox({ account, isSelected, onSelect }: AccountBoxProps) {
  const getBankLogo = (bankName: string) => {
    switch (bankName) {
      case "대구은행":
        return "dgbLogo";
      case "경남은행":
      case "부산은행":
        return "bnkLogo";
      case "하나은행":
        return "hanaLogo";
      case "농협은행":
        return "nhLogo";
      case "신한은행":
        return "shinhanLogo";
      case "국민은행":
        return "kbLogo";
      case "카카오뱅크":
        return "kakaobankLogo";
      case "S&C제일은행":
        return "scLogo";
      case "광주은행":
        return "gjLogo";
      default:
        break;
    }
  };

  const handleSelect = () => {
    if (account.virtualAccountId !== undefined) {
      onSelect(account.virtualAccountId);
    }
  };

  const maskAccountNumber = (currentAccountNum: string) => {
    const parts = currentAccountNum.split("-");

    const maskedParts = parts.map((part, index) => {
      if (index === 0 || index === parts.length - 1) {
        return part;
      } else {
        return "*".repeat(part.length);
      }
    });

    return maskedParts.join("-");
  };

  return (
    <View className="m-2 p-4 flex flex-row justify-between items-center rounded-2xl bg-white border-[3px] border-darkgray border-solid">
      <View className="flex flex-row items-center">
        <View className="mr-4 z-12 w-12 h-12 object-cover overflow-hidden flex justify-center items-center rounded-full border-[3px] border-darkgray border-solid">
          <View>
            {account.bankName && (
              <Image
                source={{
                  uri: `${Config.IMAGE_URL}/bank/${getBankLogo(
                    account.bankName,
                  )}.png`,
                }}
                className="z-11 w-12 h-12"
              />
            )}
          </View>
        </View>
        <View className="flex flex-col gap-1">
          <Text className="text-darkgray text-sm font-PretendardBold">
            {account.accountName}
          </Text>
          <Text className="text-darkgray50 text-2xs font-PretendardBold">
            {maskAccountNumber(account.accountNumber)}
          </Text>
          <Text className="text-sub02 text-xs font-PretendardBold">
            잔액 {account.balance.toLocaleString("ko-KR")} 원
          </Text>
        </View>
      </View>
      <Pressable onPress={() => handleSelect()}>
        {isSelected ? (
          <SvgUri
            uri={`${Config.IMAGE_URL}/asset/checkBoxOn.svg`}
            width={40}
            height={40}
          />
        ) : (
          <SvgUri
            uri={`${Config.IMAGE_URL}/asset/checkBoxOff.svg`}
            width={40}
            height={40}
          />
        )}
      </Pressable>
    </View>
  );
}

export default AccountBox;
