import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useEffect } from "react";
import { View, Text } from "react-native";
import reactotron from "reactotron-react-native";
import { getAsyncData } from "../utils/common";

export default function Splash() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      reactotron.log!("체크 중...");
      try {
        const loginData = (await getAsyncData(
          "loginData",
        )) as CommonType.TloginData;
        reactotron.log!("loginData 확인 성공!", loginData);

        if (loginData === null || loginData.info === 0) {
          navigation.navigate("Login");
        }

        if (loginData.info === 1) {
          navigation.navigate("SettingEmail");
        }

        if (loginData.info === 2) {
          navigation.navigate("SettingName");
        }

        if (loginData.info === 3) {
          navigation.navigate("SettingAccount");
        }
      } catch (error) {
        reactotron.log!("loginData 확인 실패!", error);
      }
    };
    checkIsLoggedIn();
  }, []);

  return (
    <View>
      <Text>Splash</Text>
    </View>
  );
}
