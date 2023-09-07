import { Image, View, Text, TouchableOpacity } from 'react-native';

function Login() {
  const KakaoLogoImg = require('../assets/images/kakaologo.png')
  const handleLogin = () => {
    console.log('로그인 클릭!');
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