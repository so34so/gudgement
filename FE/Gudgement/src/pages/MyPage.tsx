import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { View, ImageBackground } from "react-native";

import NavigationButton from "../components/NavigationButton";
import TagBoxLarge from "../components/TagBoxLarge";

import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator } from "react-native";
import reactotron from "reactotron-react-native";
import { useEffect, useState } from "react";
import { IMAGE_URL } from "@env";

function MyPage(this: unknown) {
  const {
    data: userData,
    error: fetchError,
    isLoading,
    refetch,
  } = useQuery<CommonType.Tuser>({
    queryKey: ["fetchUserInfo"],
    enabled: false,
  });

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  if (fetchError) {
    reactotron.log!(fetchError);
  } else {
    reactotron.log!("홈 사용자 정보", userData);
  }

  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);
  const [modalText, setModalText] = useState("");

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleMoveScreen = async (screen: string) => {
    navigation.navigate(screen);
  };

  return (
    <View className="w-full h-full flex justify-center items-center">
      <ImageBackground
        source={{
          uri: `${IMAGE_URL}/asset/mypageBackground.png`,
        }}
        resizeMode="cover"
        className="flex w-full h-full"
      >
        <TagBoxLarge
          text01={userData?.email ? userData?.email : "인동파 행동대장"}
          text02={userData?.nickname ? userData?.nickname : "옥계공주"}
          img={`${IMAGE_URL}/asset/mypageIcon.png`}
        />
        <View className="w-[80px]">
          <NavigationButton
            handleFunction={() => handleMoveScreen("Pedometer")}
            text="만보"
            height="sm"
            width="sm"
            size="md"
            color="green"
          />
          <NavigationButton
            handleFunction={() => handleMoveScreen("Analyze")}
            text="분석"
            height="sm"
            width="sm"
            size="md"
            color="green"
          />
        </View>
      </ImageBackground>
    </View>
  );
}

export default MyPage;
