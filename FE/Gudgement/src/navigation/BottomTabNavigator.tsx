import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import MyPage from '../pages/MyPage';
import Play from '../pages/Play';
import Ranking from '../pages/Ranking';
import Shop from '../pages/Shop';
import { CommonType } from '../types/CommonType';
function BottomTabNavigator() {
  const Tab = createBottomTabNavigator<CommonType.RootStackParamList>();
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Play" component={Play} />
      <Tab.Screen name="MyPage" component={MyPage} />
      <Tab.Screen name="Ranking" component={Ranking} />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator;