import AsyncStorage from "@react-native-async-storage/async-storage";
import Reactotron from "reactotron-react-native";

export const BOTTOM_TAB_MENU = ["홈", "상점", "플레이", "내 정보", "랭킹"];
export const textShadow = {
  textShadowColor: "rgba(0, 0, 0, 0.5)", // 그림자의 색상과 투명도
  textShadowOffset: { width: 2, height: 2 }, // 그림자의 위치 조정
  textShadowRadius: 5, // 그림자의 블러 정도
};
export const INVENTORY_CATEGORY: {
  [key: string]: string;
} = {
  캐릭터: "character",
  치장: "decor",
  칭호: "title",
  소모품: "consumable",
};

// 데이터 저장
export const setAsyncData = async (key: string, value: unknown) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
    return true;
  } catch (error) {
    Reactotron.log!(error);
    return false;
  }
};

// 데이터 불러오기
export const getAsyncData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data: unknown = JSON.parse(value);
      return data as string;
    }
  } catch (error) {
    Reactotron.log!(error);
  }
};

// 데이터 삭제
export const removeAsyncData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Reactotron.log!(error);
  }
};

// 해당 key가 AsyncStorage에 존재하는지 여부 확인
export const containsAsyncKey = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (error) {
    Reactotron.log!(error);
  }
};
