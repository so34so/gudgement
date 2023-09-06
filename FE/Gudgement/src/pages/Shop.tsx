import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CommonType } from '../types/CommonType';
import { Text, TouchableOpacity, View } from 'react-native';
function Shop() {
  const navigation = useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  return (
    <View className='w-full h-full flex justify-center items-center'>
      <TouchableOpacity onPress={
        () => navigation.navigate('Inventory')}
      >
        <Text>Inventory</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Shop;