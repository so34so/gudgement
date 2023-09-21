import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ImageBackground,
  ImageSourcePropType,
  Image,
  Pressable,
} from "react-native";
import { WithLocalSvg } from "react-native-svg";
import MyPageBackground from "../assets/images/mypageBackground.png";
import MyPageIcon from "../assets/images/mypageIcon.png";
import ArrowIcon from "../assets/icons/arrowIcon.svg";
import NavigationButton from "../components/NavigationButton";
import { getAsyncData } from "../utils/common";
import Reactotron from "reactotron-react-native";

function SettingName() {
  const mypageBackground: ImageSourcePropType =
    MyPageBackground as ImageSourcePropType;
  const analysisIcon: ImageSourcePropType = MyPageIcon as ImageSourcePropType;
  const arrowIcon: ImageSourcePropType = ArrowIcon as ImageSourcePropType;

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [name, setName] = useState("");
  const [tempUserId, setTempUserId] = useState(0);

  const getTempUserId = async () => {
    try {
      const responseGetId = await getAsyncData("id");
      Reactotron.log!("아이디 확인 성공!", responseGetId);
      setTempUserId(responseGetId ? parseInt(responseGetId, 10) : 0);
    } catch (error) {
      Reactotron.log!("아이디 확인 실패!", error);
    }
  };

  const handleCheckName = async (currentEmail: string) => {
    const sendBE = {
      id: tempUserId,
      email: currentEmail,
    };
    Reactotron.log!("sendBE", sendBE);
    try {
      const response = await axios.post(`${API_URL}/member/valid/nickname`);
      Reactotron.log!("인증 메일 요청 성공!", response.data);
      if (response.status === 200) {
        const mailCode = response.data.toString();
        setCheckNumber(mailCode);
        setEmail(currentEmail);
        // 이메일로 전송된 인증 코드를 입력하세요! 알림 모달창
      }
    } catch (error) {
      // 인증 메일 요청 실패! 알림 모달창
      Reactotron.log!("인증 메일 요청 실패!", error);
    }
  };

  return (
    <View className="flex">
      <ImageBackground
        source={mypageBackground}
        resizeMode="cover"
        className="flex w-screen h-screen"
      >
        <View className="z-10 flex flex-col">
          <View className="flex flex-row justify-between items-center px-4">
            <Pressable onPress={() => navigation.navigate("SettingEmail")}>
              <WithLocalSvg width={50} height={50} asset={arrowIcon} />
            </Pressable>
            <View className="m-7 p-[2px] flex flex-row h-fill w-[140px] justify-center items-center bg-white70 border-solid border-[3px] rounded-xl border-darkgray">
              <Text className="py-1 px-2 w-full text-center bg-darkgray rounded-lg text-white text-sm font-PretendardExtraBold">
                닉네임 설정
              </Text>
            </View>
            <View className="bg-transparent h-10 w-10" />
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
                      onChangeText={setName}
                      value={name}
                      placeholder="닉네임"
                      placeholderTextColor="darkgray"
                      className="h-[60px] w-[230px] p-4 mr-2 bg-white rounded-xl border-solid border-[3px] border-darkgray text-sm font-PretendardExtraBold"
                    />
                    <NavigationButton
                      handleFunction={() => handleCheckName(name)}
                      text="중복 확인"
                      height="lg"
                      width="sm"
                      size="md"
                      color="lightsky"
                    />
                  </View>
                  <Text className="text-darkgray50 text-xs font-PretendardExtraBold px-4 pb-4">
                    닉네임을 입력해주세요.
                  </Text>
                </SafeAreaView>
              </View>
            </View>
          </View>
        </View>
        <View className="z-0 w-full h-full absolute pb-10 flex justify-end items-center">
          <NavigationButton
            handleFunction={() => handleName(name)}
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

export default SettingName;
