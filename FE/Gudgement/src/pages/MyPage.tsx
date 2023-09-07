import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CommonType } from '../types/CommonType';
import { Text, TouchableOpacity, View } from 'react-native';
function MyPage() {

  const NavigationButton = ({ screenName, text }: { screenName: keyof CommonType.RootStackParamList; text: string }) => {
    const navigation = useNavigation<NavigationProp<CommonType.RootStackParamList>>();
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate(screenName)} className=''>
        <Text>{text}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View className='w-full h-full flex justify-center items-center'>
      <NavigationButton screenName="Pedometer" text="만보 걷기" />
      <NavigationButton screenName="Analyze" text="분석" />
      <NavigationButton screenName="SingleRecords" text="싱글플레이 상세" />
      <NavigationButton screenName="MultiRecords" text="멀티플레이 상세" />
    </View>
  )
}

export default MyPage;