import { CommonType } from "../types/CommonType";
import {
  ImageBackground,
  View,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from "react-native";
import PointHeader from "../components/PointHeader";
import { useEffect, useState } from "react";
import { API_URL, IMAGE_URL, SERVER_URL } from "@env";
import { useQuery } from "@tanstack/react-query";
import reactotron from "reactotron-react-native";
import messaging from "@react-native-firebase/messaging";
import {
  getAsyncData,
  screenHeight,
  screenWidth,
  updateAsyncData,
} from "../utils/common";
import { checkSpendRate, fetchUser } from "../utils/common";
import AnalysisBox from "../components/AnalysisBox";
import { NavigationProp, useNavigation } from "@react-navigation/native";

/**
 * percent: 유저가 설정한 소비내역 대비 얼마만큼 썼는지를 퍼센테이지로 서버한테 달라고 요청해야 함
 * 서버에서 유저가 기준일로 부터 현재까지 쓴 소비 내역 총합만 줄 수 있다고 하면 퍼센트를 직접 계산하면 됨
 * (현재 소비내역 / 유저가 목표로하는 소비내역) * 100
 *
 * 위험, 안정 기준: 설정한 소비내역 대비 70%(0.7)보다 더 많이 쓴 경우엔 위험,
 *  50% ~ 70%는 안정, 그 이하는 절약으로 설정해놓은 상태
 */
console.log(API_URL);
console.log(IMAGE_URL);
export default function Home() {
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const goodIcon: ImageSourcePropType = GoodIcon as ImageSourcePropType;
  const [percent, setPercent] = useState(0.6);
  const [spend, setSpend] = useState<{ text: string; color: string }>({
    text: "",
    color: "",
  });
  const [isStartSingle] = useState(true);

  useEffect(() => {
    if (percent <= 0.5) {
      setSpend({ text: "절약", color: "text-black" });
    }
    if (percent > 0.5 && percent <= 0.7) {
      setSpend({ text: "안정", color: "text-black" });
    }
    if (percent > 0.7) {
      setSpend({ text: "위험", color: "text-red" });
    }
  }, [percent]);

  // const updateLoginData = async () => {
  //   try {
  //     const loginData = {
  //       info: true,
  //     };
  //     await updateAsyncData("loginData", loginData);
  //   } catch (error) {
  //     reactotron.log!(error);
  //   }
  // };

  // useEffect(() => {
  //   updateLoginData();
  // }, []);

  async function fetchUser(): Promise<CommonType.TUser | undefined> {
    const loginData = (await getAsyncData(
      "loginData",
    )) as CommonType.TloginData;
    try {
      const response: AxiosResponse<CommonType.Tuser> = await axios.get(
        `${API_URL}/member/loadMyInfo`,
        {
          headers: {
            Authorization: `Bearer ${loginData.accessToken}`,
          },
        },
      );
      reactotron.log!("fetchUser", response);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<CommonType.Terror>;
      if (axiosError.response) {
        const errorMessage = axiosError.response.data.message;
        // navigation.navigate("Login");
        reactotron.log!("홈 에러", errorMessage);
      }
    }
  }
  const {
    data: userData,
    error: fetchError,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: ["fetchUserInfo"],
    queryFn: () => fetchUser(),
  });

  useEffect(() => {
    async function sendToken(myInfo: CommonType.TUser) {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        console.log("phone token", token);
        // dispatch(userSlice.actions.setPhoneToken(token));
        const response = await axios.put(`${SERVER_URL}/fcm/token`, {
          id: myInfo.memberId,
          firebaseToken: token,
        });
        reactotron.log!(response.data);
        return response;
      } catch (error) {
        console.error(error);
      }
    }
    if (isSuccess && userData) {
      sendToken(userData);
    }
  }, [isSuccess, userData]);

  // if (fetchError) {
  //   return (
  //     <View>
  //       <Text>에러</Text>
  //     </View>
  //   );
  // }
  const [percent, setPercent] = useState(userData?.rate.rate as number);
  const [spend, setSpend] = useState<{
    text: string;
    color: string;
    img: number;
  }>({
    text: "",
    color: "",
    img: 0,
  });

  useEffect(() => {
    if (userData) {
      checkSpendRate(userData, percent, setSpend);
    }
  }, [percent]);

  reactotron.log!("userData", userData);

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  if (fetchError) {
    reactotron.log!(fetchError);
  } else {
    reactotron.log!("홈 사용자 정보", userData);
  }

  return (
    <SafeAreaView>
      <View className="w-full h-full flex justify-start items-center">
        <PointHeader tiggle={user?.tiggle} level={user?.level} />
        <ImageBackground
          source={{
            uri: `${IMAGE_URL}/asset/homeBackground.png`,
          }}
          resizeMode="stretch"
          style={{ opacity: 0.8, backgroundColor: "black" }}
          className="absolute w-full h-full top-0 left-0 right-0 bottom-0"
        />
        <View className="space-y-2 flex flex-col w-fill justify-center items-start">
          <PointHeader tiggle={userData?.tiggle} level={userData?.level} />
          <View className="mx-1 bg-white rounded-xl flex w-fit h-fit justify-start space-x-2 items-center flex-row overflow-hidden border-[2.5px] border-black">
            <Text className="text-center font-PretendardBlack bg-green text-black px-2 py-[2px] text-md">
              계좌 잔고
            </Text>
            <Text className="text-center font-PretendardBlack bg-transparent text-black px-2 text-md right-1">
              {userData?.rate.balance
                ? userData?.rate.balance.toLocaleString("ko-KR")
                : 0}{" "}
              원
            </Text>
          </View>
          <View className="flex justify-center items-center w-[90%]">
            <AnalysisBox />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
