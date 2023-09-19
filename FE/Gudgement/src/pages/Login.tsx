import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { useState } from "react";
import {
  Image,
  View,
  Text,
  Pressable,
  ImageSourcePropType,
} from "react-native";
import { WebView, WebViewNavigation } from "react-native-webview";
import { KAKAO_LOGIN_REST_API_KEY, KAKAO_LOGIN_REDIRECT_URI } from "@env";
import KakaoLogoImg from "../assets/images/kakaoLogo.png";
import axios from "axios";
import Reactotron from "reactotron-react-native";

// interface LoginProps {
//   onLogin: () => void; // onLogin의 타입을 명시
// }
//{ onLogin }: LoginProps

function Login() {
  const kakaoLogoImg: ImageSourcePropType = KakaoLogoImg as ImageSourcePropType;
  const [showWebView, setShowWebView] = useState(false);
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const handleLogin = () => {
    setShowWebView(true);
  };

  console.log(KAKAO_LOGIN_REDIRECT_URI);
  Reactotron.log!(KAKAO_LOGIN_REDIRECT_URI);

  const handleAuthorizationCode = (event: WebViewNavigation) => {
    const url = event.url;
    // url에 붙어오는 code= 가있다면 뒤부터 parse하여 인가 코드 get
    const exp = "code=";
    const searchIdx = url.indexOf(exp);
    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);
      console.log("인가 코드", code);
      try {
        const response = axios.post(
          `http://j9d106.p.ssafy.io:8080/oauth/kakao/callback?code=${code}`,
        );
        console.log("인가 코드 전달 성공!", response);
        Reactotron.log!("인가 코드 전달 성공!", response);
        // Authorization Code 전달하면
        // Access Token 받기
        // 받은 Access Token 다시 전달
        // 유저 정보 받기
        // 로그인 유지
      } catch (error) {
        Reactotron.log!("인가 코드 전달 실패!", error);
      }

      navigation.navigate("SettingEmail");

      return false;
    }
    return true;
  };

  if (showWebView) {
    return (
      <WebView
        className="flex"
        // 웹뷰 보여줄 페이지 주소
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_LOGIN_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}`,
        }}
        onShouldStartLoadWithRequest={handleAuthorizationCode}
      />
    );
  }
  return (
    <View className="flex flex-row justify-center items-end h-full pb-20">
      <Pressable
        onPress={handleLogin}
        className="flex flex-row justify-center items-center w-[300px] py-4 bg-buy rounded-lg border-solid border-[3px] border-darkgray"
      >
        <Image source={kakaoLogoImg} className="h-8 w-9 mr-6" />
        <Text className="text-center text-darkgray text-md font-PretendardExtraBold">
          카카오로 시작하기
        </Text>
      </Pressable>
    </View>
  );
}

export default Login;
