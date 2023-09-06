import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Shop from '../pages/Shop';
import Inventory from '../pages/Inventory';
import { CommonType } from '../types/CommonType';
export default function ShopNavigator() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  return (
    <Stack.Navigator initialRouteName='Shop' screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Shop"
        component={Shop}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Inventory"
        component={Inventory}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}