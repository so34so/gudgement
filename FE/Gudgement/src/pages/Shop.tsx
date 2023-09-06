import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CommonType } from '../types/CommonType';
import { Text, TouchableOpacity, View } from 'react-native';
function Shop() {
  const navigation = useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  return (
    <View className='w-full h-full flex flex-col justify-start items-center bg-sub01'>
      <View className='w-full h-auto justify-around space-x-36 flex flex-row top-10'>
        <View className='bg-white border-2 border-black w-28 h-8 flex justify-center items-center rounded-[4px]'>
          <View className='bg-black w-[96%] h-[88%] rounded-[4px]'>
            <Text className='text-center ml-6 font-PretendardExtraBold text-white text-[16px] whitespace-nowrap'>상점</Text>
          </View>
        </View>
        <TouchableOpacity className='bg-main rounded-[4px]' onPress={
          () => navigation.navigate('Inventory')}
        >
          <Text className='p-1 font-PretendardExtraBold text-darkgray text-[16px]'>인벤토리 보기</Text>
        </TouchableOpacity>
      </View>
      <View className='absolute w-12 h-12 top-8
       left-2 rounded-full bg-white border-2 border-black justify-center items-center'>
        <View className='rounded-full w-10 h-10 z-10 flex bg-darkgray'>
        </View>
      </View>
    </View>
  )
}

export default Shop;