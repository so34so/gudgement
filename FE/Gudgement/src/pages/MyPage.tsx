import { NavigationProp, useNavigation } from '@react-navigation/native';
import { CommonType } from '../types/CommonType';
import { Text, TouchableOpacity, View, ImageBackground, Image } from 'react-native';

function MyPage() {
  const mypageBackground = require('../assets/images/mypagebg.png');
  const mypageIcon = require('../assets/images/mypageicon.png');
  const analysisIcon = require('../assets/images/analysisicon.png');
  const character = require('../assets/images/character.png');

  const NavigationButton = ({ screenName, text }: { screenName: keyof CommonType.RootStackParamList; text: string }) => {
    const navigation = useNavigation<NavigationProp<CommonType.RootStackParamList>>();
    
    return (
      <TouchableOpacity onPress={() => navigation.navigate(screenName)} className=''>
        <Text>{text}</Text>
      </TouchableOpacity>
    )
  }

  interface TagBoxLargeProps {
    text01: string;
    text02: string;
    img: number;
  }

  const TagBoxLarge = ({text01, text02, img}: TagBoxLargeProps) => {
    return (
      <View className='flex flex-row relative m-3 items-center'>
        <View className='z-10 p-[2px] bg-white70 border-solid border-[2px] border-darkgray rounded-full'>
          <View className='bg-darkgray rounded-full'>
            <Image source={img} className='h-10 w-10' />
          </View>
        </View>
        <View className='z-9 absolute ml-7 pl-2 pr-[2px] py-[2px] flex flex-row h-fill justify-center items-center bg-white70 border-solid border-[2px] rounded-lg border-darkgray'>
          <Text className='py-1 pl-3 pr-2 bg-darkgray rounded-lg text-white text-xs font-PretendardExtraBold'>
            {text01}
          </Text>
          <Text className='px-2 text-darkgray text-xs font-PretendardExtraBold'>
            {text02}
          </Text>
        </View>
      </View>
    )
  }

  interface TagBoxSmallProps {
    text: string;
    img: number;
  }

  const TagBoxSmall = ({ text, img }: TagBoxSmallProps) => {
    return (
      <View className='flex flex-row relative m-3 items-center'>
        <View className='z-10 bg-lightsky border-solid border-[2px] border-darkgray rounded-full'>
          <Image source={img} className='h-10 w-10' />
        </View>
        <View className='z-9 absolute ml-7 pl-3 pr-1 py-1 flex flex-row h-fill justify-center items-center bg-white70 border-solid border-[2px] rounded-lg border-darkgray'>
          <Text className='px-2 text-darkgray text-xs font-PretendardExtraBold'>
            {text}
          </Text>
        </View>
      </View>
    )
  }

  interface PedeometerSpeechBubbleProps {
    text: string;
  }

  const PedeometerSpeechBubble = ({ text }: PedeometerSpeechBubbleProps) => {
    return (
      <View className='w-[160px] px-3 py-1 flex flex-row justify-center items-center bg-white border-solid border-[3px] rounded-lg border-darkgray'>
        <Text className='text-darkgray text-xs font-PretendardExtraBold'>
          {text}
        </Text>
    </View>
    )
  }

  return (
    <View className='w-full h-full flex justify-center items-center'>
      <ImageBackground
        source={mypageBackground}
        resizeMode="cover"
        className="flex w-full h-full"
      > 
        <TagBoxLarge text01={'인동파 행동대장'} text02={'옥계공주'} img={mypageIcon} />
        <View className='mb-10 flex flex-row justify-center items-center'>
          <View>
            <Image source={character} />
            <PedeometerSpeechBubble text={'뚜벅뚜벅뚜벅뚜벅...'}/>
          </View>
          <View>
            <Image source={character} />
          </View>
        </View>
        <TagBoxSmall text={'이번달 소비 추이'} img={analysisIcon}/>
        <NavigationButton screenName="Pedometer" text="만보 걷기" />
        <NavigationButton screenName="Analyze" text="분석" />
        <NavigationButton screenName="SingleRecords" text="싱글플레이 상세" />
        <NavigationButton screenName="MultiRecords" text="멀티플레이 상세" />
      </ImageBackground>
    </View>
  )
}

export default MyPage;
