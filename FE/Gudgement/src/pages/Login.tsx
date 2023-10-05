import { useState, useEffect } from "react";
import { Image, View, Text, Pressable, ImageBackground } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";
import axios from "axios";

import Config from "react-native-config";

import reactotron from "reactotron-react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { getAsyncData, setAsyncData } from "../utils/common";
import { CommonType } from "../types/CommonType";
import { queryClient } from "../../queryClient";

interface LoginProps {
  setIsLoginLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

function Login({ setIsLoginLoading }: LoginProps) {
  const [showWebView, setShowWebView] = useState(false);
  const offset = useSharedValue(4);
  const offset2 = useSharedValue(6);

  useEffect(() => {
    offset.value = withRepeat(
      withTiming(-offset.value, { duration: 300 }),
      -1,
      true,
    );
    offset2.value = withRepeat(
      withTiming(-offset2.value, { duration: 320 }),
      -1,
      true,
    );
  }, [offset, offset2]);
  // 애니메이션
  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offset.value }],
  }));
  const animatedStyles2 = useAnimatedStyle(() => ({
    transform: [{ translateY: offset2.value }],
  }));

  const handleLogin = () => {
    setShowWebView(true);
  };

  const fetchAccessToken = async (code: string) => {
    try {
      const response = await axios.post<CommonType.TkakaoLogin>(
        `${Config.SERVER_URL}/?code=${code}`,
      );
      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;
      const id = response.data.id;
      setAsyncData("accessToken", accessToken);
      setAsyncData("refreshToken", refreshToken);
      setAsyncData("id", id);

      const getAccessToken = await getAsyncData<string>("accessToken");
      const getRefreshToken = await getAsyncData<string>("refreshToken");
      const getId = await getAsyncData<number>("id");
      reactotron.log!("스토리지에 accessToken 저장 성공!", getAccessToken);
      reactotron.log!("스토리지에 refreshToken 저장 성공!", getRefreshToken);
      reactotron.log!("스토리지에 id 저장 성공!", getId);

      setShowWebView(false);

      queryClient.invalidateQueries(["isLoggedIn"]);
      queryClient.invalidateQueries(["fetchUserInfo"]);
      setIsLoginLoading(true);

      setTimeout(() => {
        setIsLoginLoading(false);
      }, 1000);
    } catch (error) {
      reactotron.log!("인가 코드 전달 실패!", error);
    }
  };

  const getAuthorizationCode = async (event: WebViewMessageEvent) => {
    const url = event.nativeEvent.url;
    const exp = "code=";
    const searchIdx = url.indexOf(exp);

    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);
      reactotron.log!("code", code);
      await fetchAccessToken(code);
    }
  };

  const handleAuthorizationCode = async (event: WebViewMessageEvent) => {
    try {
      await getAuthorizationCode(event);
    } catch (error) {
      reactotron.log!("에러 발생!", error);
    }
  };

  if (showWebView) {
    return (
      <WebView
        className="flex"
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${Config.KAKAO_LOGIN_REST_API_KEY}&redirect_uri=${Config.KAKAO_LOGIN_REDIRECT_URI}`,
        }}
        injectedJavaScript={
          'window.ReactNativeWebView.postMessage("this is message from web");'
        }
        javaScriptEnabled={true}
        onMessage={event => {
          if (!event.nativeEvent.loading) {
            handleAuthorizationCode(event);
          }
        }}
      />
    );
  }

  return (
    <View className="flex w-full h-full">
      <ImageBackground
        source={{ uri: `${Config.IMAGE_URL}/asset/mainscreen.png` }}
        resizeMode="cover"
        className="flex-1"
      >
        <Animated.View style={[animatedStyles]}>
          <Image
            className="absolute justify-center left-[150] top-[400] flex-2 h-[250] w-[250]"
            source={{
              uri: `${Config.IMAGE_URL}/asset/mainscreenbam.png`,
            }}
          />
        </Animated.View>
        <Animated.View style={[animatedStyles2]}>
          <Image
            className="absolute justify-center top-[400] flex-2 h-[250] w-[250]"
            source={{
              uri: `${Config.IMAGE_URL}/asset/mainscreenpingpingeee.png`,
            }}
          />
        </Animated.View>
        <View className="flex flex-row justify-center items-end h-full pb-20">
          <Pressable
            onPress={handleLogin}
            className="flex flex-row justify-center items-center w-[300px] py-4 bg-buy rounded-lg border-solid border-[3px] border-darkgray"
          >
            <Image
              source={{ uri: `${Config.IMAGE_URL}/asset/kakaoLogo.png` }}
              className="h-8 w-9 mr-6"
            />
            <Text className="text-center text-darkgray text-md font-PretendardExtraBold">
              카카오로 시작하기
            </Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

export default Login;
