import { useCallback, useEffect, useState } from "react";
import {
  ImageBackground,
  Image,
  ImageSourcePropType,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import GameCardCollection from "./GameCardCollection";
import GameUI from "../assets/images/gameui.png";
import { CommonType } from "../types/CommonType";
import Config from "react-native-config";
function GameUi({
  roundInfo,
  myInfoState,
  enemyInfoState,
}: {
  roundInfo: object;
  myInfoState: object;
  enemyInfoState: object;
}) {
  const gameUi: ImageSourcePropType = GameUI as ImageSourcePropType;
  const mytiggles = roundInfo?.userTiggles[0].tiggle;
  const enemytiggles = roundInfo?.userTiggles[1].tiggle;
  const [isModalVisible, setModalVisible] = useState(false);

  return (
    <View className=" flex w-full h-full">
      <ImageBackground source={gameUi} resizeMode="cover" className="flex-1">
        <View className="flex-1" />
        <View className="flex flex-row right-[-288] top-[-620] items-center justify-center space-x-1  w-32 h-[55px] border-black">
          <Image
            source={{
              uri: `${Config.IMAGE_URL}/asset/tiggleIcon.png`,
            }}
            className="h-8 w-8"
          />
          <Text className="text-white text-[24px]  p-1 font-PretendardExtraBold ">
            {enemytiggles}
          </Text>
        </View>

        <View className="flex flex-row right-[-10] top-[120] items-center justify-center space-x-3  w-32 h-[55px] border-black">
          <Text className="text-white text-[24px]  p-1 font-PretendardExtraBold ">
            {myInfoState?.nickname}
          </Text>
        </View>

        <View className="flex flex-row right-[-300] top-[40] items-center justify-center space-x-3  w-32 h-[55px] border-black">
          <Text className="text-white text-[24px]  p-1 font-PretendardExtraBold ">
            아이템
          </Text>
        </View>
        <View className="flex flex-row top-[50] items-center justify-center space-x-2  w-32 h-[55px] border-black">
          <Image
            source={{
              uri: `${Config.IMAGE_URL}/asset/tiggleIcon.png`,
            }}
            className="h-8 w-8"
          />
          <Text className="text-white text-[24px]  p-1 font-PretendardExtraBold ">
            {mytiggles}
          </Text>
        </View>
        <View className="flex flex-row top-[-5] right-[-180] items-center justify-center space-x-3 w-32 h-[55px] border-black">
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              source={{
                uri: `${Config.IMAGE_URL}/asset/mycardcollection.png`,
              }}
              className="h-14 w-14"
            />
          </TouchableOpacity>
        </View>

        {/* 카드 컬렉션 모달 */}
        <GameCardCollection
          myInfoState={myInfoState}
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
        />
      </ImageBackground>
    </View>
  );
}

export default GameUi;
