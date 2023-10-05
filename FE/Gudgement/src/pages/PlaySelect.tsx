import PlayBackground2 from "../assets/images/playBackground2.png";
import LineGradi from "../assets/images/linegradi.png";
import Cards from "../assets/images/cards.png";
import Reactotron from "reactotron-react-native";
import CloseButton from "../components/CloseButton";
import PlayCarousel from "../components/PlayCarousel";
import axios from "axios";
import {
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
  useContext,
} from "react";
import {
  ImageBackground,
  Image,
  Text,
  ImageSourcePropType,
  Pressable,
  View,
  StyleSheet,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { CommonType } from "../types/CommonType";
import { mapInfoArray } from "../components/MapData";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../utils/common";
import Config from "react-native-config";

function PlaySelect() {
  // 유저 정보 가져오기
  const { data: userInfo } = useQuery<CommonType.TUser>({
    queryKey: ["fetchUserInfo"],
  });

  console.log(userInfo);
  const MEMBER_ID = userInfo?.memberId;
  const MEMBER_NickName = userInfo?.nickname;
  const MEMBER_RoleUser = userInfo?.grade;
  console.log(typeof MEMBER_NickName);
  const playBackground2: ImageSourcePropType =
    PlayBackground2 as ImageSourcePropType;
  const lineGradi: ImageSourcePropType = LineGradi as ImageSourcePropType;
  const cards: ImageSourcePropType = Cards as ImageSourcePropType;
  const navigation =
    useNavigation<NavigationProp<CommonType.RootStackParamList>>();
  const [selectedMap, setSelectedMap] = useState(mapInfoArray[0]);

  const handleMapSelection = map => {
    setSelectedMap(map);
    console.log(selectedMap);
  };

  // 매칭하기 함수
  async function postMatchStart() {
    try {
      const accessToken = await getAccessToken();
      const response = await axios.post(`${Config.API_URL}/match/addUser`, {
        // params: {
        memberId: MEMBER_ID,
        nickName: MEMBER_NickName,
        grade: MEMBER_RoleUser,
        tiggle: selectedMap.ticle,
        timestamp: 0,
        // },
        // headers: {
        //   Authorization: `Bearer ${accessToken}`,
        // },
      });
      Reactotron.log!("흠", response.data);
      return response;
    } catch (error) {
      Reactotron.log!(error);
      return undefined; // 에러 시 undefined를 반환하거나 다른 오류 처리 방식을 선택하세요.
    }
  }

  const handleStartMatch = async () => {
    try {
      const response = await postMatchStart();
      if (response) {
        // 응답이 유효한 경우에만 navigation을 진행합니다.
        navigation.navigate("PlayMatchingWait", {
          memberId: MEMBER_ID,
          nickName: MEMBER_NickName,
          grade: MEMBER_RoleUser,
          tiggle: selectedMap.ticle,
          timestamp: 0,
        });
      }
    } catch (error) {
      console.error("대전 찾기 중 오류 발생", error);
      // 오류가 발생했을 때의 처리를 수행
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={playBackground2}
        resizeMode="cover"
        style={styles.background}
      >
        <Pressable onPress={() => navigation.navigate("플레이")}>
          <CloseButton />
        </Pressable>
        <PlayCarousel onSelectMap={handleMapSelection} />

        <View style={styles.cards}>
          <Image
            className="w-[205] h-[168]"
            source={cards}
            resizeMode="contain"
          />
        </View>
        {/* <BettingMachine /> */}

        <View style={styles.lineGradi} className="flex items-center">
          <Pressable onPress={handleStartMatch}>
            <Text className="flex m-auto justify-center rounded-lg text-white text-[32px] font-PretendardExtraBold">
              대전 찾기
            </Text>
            <Image className="mt-12" source={lineGradi} />
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  cards: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "90%",
    left: "25%",

    zIndex: 10,
  },
  lineGradi: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    width: 360,
    height: 75,
    top: "85%",
    left: "5%",
    zIndex: 9,
  },
  mapTitle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "52%",
    left: "39%",
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  mapInfo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "57%",
    left: "29%",
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: "10%", // Two-thirds of the way down
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default PlaySelect;
