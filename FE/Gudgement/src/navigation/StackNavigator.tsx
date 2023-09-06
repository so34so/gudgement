import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';
import { CommonType } from '../types/CommonType';
import Shop from '../pages/Shop';
import Multi from '../pages/Multi';
import Single from '../pages/Single';
function StackNavigator() {

  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();

  const customStackNavigationOptions: NativeStackNavigationOptions = {
    gestureEnabled: false,
    title: '',
    headerStyle: {
      backgroundColor: '#209bec',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  }
  return (
    <Stack.Navigator initialRouteName="Shop" >
      {/* <Stack.Screen name='Home' component={Home} /> */}

      <Stack.Screen name='Shop' component={Shop} />

      {/**
       * <플레이 관련 그룹>
       * 싱글 플레이
       * 멀티 플레이
       * 
       * 싱글 플레이 대기실
       * 싱글 플레이 인게임
       * 
       * 멀티 플레이 대기실
       * 멀티 플레이 인게임
       * 
       * */}
      <Stack.Group
        screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}
      >
        <Stack.Screen name="Single" component={Single} options={{ title: 'Single' }} />
        <Stack.Screen
          name="Multi"
          component={Multi}
          options={{ title: 'Multi' }}
        />
      </Stack.Group>

      {/**
       * <마이페이지 관련 그룹>
       * 만보 보상 받기
       * 이번달 소비 추이 분석
       * 최근 싱글 플레이 상세보기
       * 최근 멀티 플레이 상세보기
       */}
      <Stack.Group
        screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}
      >
        {/* <Stack.Screen name="Single" component={Single} options={{ title: 'Single' }} />
        <Stack.Screen
          name="Multi"
          component={Multi}
          options={{ title: 'Multi' }}
        /> */}
      </Stack.Group>

      {/**
       * <상점 관련 그룹>
       * 인벤토리
       */}
      <Stack.Group
        screenOptions={{ headerStyle: { backgroundColor: 'papayawhip' } }}
      >
        {/* <Stack.Screen name="Single" component={Single} options={{ title: 'Single' }} />
        <Stack.Screen
          name="Multi"
          component={Multi}
          options={{ title: 'Multi' }}
        /> */}
      </Stack.Group>


    </Stack.Navigator>
  )
}

export default StackNavigator;