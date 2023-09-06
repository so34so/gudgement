import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Play from '../pages/Play';
import Ranking from '../pages/Ranking';
import { CommonType } from '../types/CommonType';
import ShopNavigator from './ShopNavigator';
import MyPageNavigator from './MyPageNavigator';
function BottomTabNavigator() {
  const Tab = createBottomTabNavigator<CommonType.RootStackParamList>();
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={Home} />
      {/* 탭 안에 스택을 넣어서 각 탭 안에 여러 스크린을 이동할 수 있도록 함 */}
      <Tab.Screen name="Shop" component={ShopNavigator} />
      <Tab.Screen name="Play" component={Play} />
      <Tab.Screen name="MyPage" component={MyPageNavigator} />
      <Tab.Screen name="Ranking" component={Ranking} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;