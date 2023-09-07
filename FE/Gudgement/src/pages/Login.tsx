import { useState } from 'react';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { KAKAO_LOGIN_REST_API_KEY, KAKAO_LOGIN_REDIRECT_URI } from '@env';
import Reactotron from 'reactotron-react-native';

// 상단에 적어 탈취하여 웹뷰에 값을 가져오기
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function Login() {
  
  const KakaoLogoImg = require('../assets/images/kakaologo.png')
  
  const [showWebView, setShowWebView] = useState(false);

  const handleLogin = () => {
    setShowWebView(true);
  }  

  const getCode = (target: string) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    Reactotron.log!(target);
  }

  if (showWebView) {
    return (
      <WebView className='flex' 
        // 웹뷰 보여줄 페이지 주소
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_LOGIN_REST_API_KEY}&redirect_uri=${KAKAO_LOGIN_REDIRECT_URI}&response_type=code`,
        }}
        // 웹뷰로 열리는 모든 페이지에서 실행될 자바스크립트 코드
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        // 웹뷰에서 window.ReactNativeWebView.postMessage 함수가 호출될때 실행되는 이벤트 함수
        onMessage={event => {
          const data = event.nativeEvent.url;
          getCode(data);
        }} 
      />
    );
  }

  return (
    <View className='flex flex-row justify-center items-end h-full pb-20'>
      <TouchableOpacity onPress={handleLogin} className='flex flex-row justify-center items-center w-[300px] py-4 bg-buy rounded-lg border-solid border-[3px] border-darkgray'>
        <Image source={KakaoLogoImg} className='h-8 w-9 mr-6'/>
        <Text className='text-center text-darkgray text-md font-PretendardExtraBold'>
          카카오로 시작하기
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login;