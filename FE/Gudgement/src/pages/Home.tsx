import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CommonType } from '../types/CommonType';
export default function Home() {
  const navigation = useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  return (
    <View className='w-full h-full flex justify-center items-center'>
      {/* <TouchableOpacity onPress={
        () => navigation.navigate('MyPage')}
      >
        <Text>이동</Text>
      </TouchableOpacity> */}
    </View>
  )
}