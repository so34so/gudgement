import {
  View,
  Text,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import ShinhanLogo from "../assets/images/shinhanLogo.png";
import CheckBoxOn from "../assets/icons/checkBoxOn.svg";
import CheckBoxOff from "../assets/icons/checkBoxOff.svg";
import { IAccount } from "../pages/SettingAccount";

interface AccountBoxProps {
  account: IAccount;
  isSelected: boolean;
}

function AccountBox({ account, isSelected }: AccountBoxProps) {
  const checkBoxOn: ImageSourcePropType = CheckBoxOn as ImageSourcePropType;
  const checkBoxOff: ImageSourcePropType = CheckBoxOff as ImageSourcePropType;
  const shinhanLogo: ImageSourcePropType = ShinhanLogo as ImageSourcePropType;

  return (
    <View className="m-2 p-4 flex flex-row justify-between items-center rounded-2xl bg-white border-[3px] border-darkgray border-solid">
      <View className="flex flex-row items-center">
        <View className="mr-4 z-12 w-12 h-12 object-cover overflow-hidden flex justify-center items-center rounded-full border-[3px] border-darkgray border-solid">
          <Image source={shinhanLogo} className="z-11 w-12 h-12" />
        </View>
        <View className="flex flex-col gap-1">
          <Text className="text-darkgray text-md font-PretendardBold">
            {account.accountName}
          </Text>
          <Text className="text-darkgray50 text-2xs font-PretendardBold">
            {account.accountNumber}
          </Text>
          <Text className="text-sub02 text-xs font-PretendardBold">
            잔액 {account.balance} 원
          </Text>
        </View>
      </View>
      <Pressable>
        {isSelected ? (
          <WithLocalSvg width={40} height={40} asset={checkBoxOn} />
        ) : (
          <WithLocalSvg width={40} height={40} asset={checkBoxOff} />
        )}
      </Pressable>
    </View>
  );
}

export default AccountBox;
