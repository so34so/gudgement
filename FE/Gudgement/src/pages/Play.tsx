import { View, Text } from 'react-native'
import Multi from './Multi'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Single from './Single';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CommonType } from '../types/CommonType';
export default function Play() {
  const navigation = useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  return (
    <View className='w-full h-full flex justify-center items-center'>

    </View>

  );
}