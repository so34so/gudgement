import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';
import MyInfo from './MyPage';
function Shop() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ title: '내 오더' }} />
      <Stack.Screen
        name="MyInfo"
        component={MyInfo}
        options={{ title: '내 정보' }}
      />
    </Stack.Navigator>
  )
}

export default Shop;