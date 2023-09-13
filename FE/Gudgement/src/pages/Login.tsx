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
import KakaoLogoImg from "../assets/images/kakaologo.png";

interface LoginProps {
  onLogin: () => void; // onLogin의 타입을 명시
}

function Login({ onLogin }: LoginProps) {
  const kakaoLogoImg: ImageSourcePropType = KakaoLogoImg as ImageSourcePropType;
  const [showWebView, setShowWebView] = useState(false);

  const handleLogin = () => {
    setShowWebView(true);
  };

  const handleShouldStartLoad = (event: WebViewNavigation) => {
    const url = event.url;
    // url에 붙어오는 code= 가있다면 뒤부터 parse하여 인가 코드 get
    const exp = "code=";
    const searchIdx = url.indexOf(exp);
    if (searchIdx !== -1) {
      const code = url.substring(searchIdx + exp.length);
      console.log("인가 코드", code);
      onLogin(); // 로그인 성공 시
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
        onShouldStartLoadWithRequest={handleShouldStartLoad}
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
