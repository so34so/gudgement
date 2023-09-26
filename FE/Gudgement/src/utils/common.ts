import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import reactotron from "reactotron-react-native";

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
    reactotron.log!(error);
    return false;
  }
};

// 데이터 불러오기
export const getAsyncData = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value) as T;
      return data;
    }
  } catch (error) {
    reactotron.log!("getAsyncData 불러오기 실패", error);
  }

  return null;
};

// 데이터 수정
export const updateAsyncData = async (key: string, updatedValue: unknown) => {
  try {
    // 1. 저장된 값을 불러옵니다.
    const existingValue = await getAsyncData(key);

    if (existingValue !== null) {
      // 2. 원하는 값을 수정합니다.
      const updatedData: unknown = {
        ...(existingValue as object), // 기존 값이 객체여야 함
        ...(updatedValue as object), // 업데이트할 값도 객체여야 함
      };

      // 3. 수정된 값을 다시 저장합니다.
      await setAsyncData(key, updatedData);
      reactotron.log!("값이 업데이트되었습니다.");
    } else {
      reactotron.log!("값이 존재하지 않습니다.");
    }
  } catch (error) {
    reactotron.error!("데이터를 업데이트하는 중에 오류가 발생했습니다:", error);
  }
};

// 데이터 삭제
export const removeAsyncData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    reactotron.log!(error);
  }
};

export const screenWidth = Math.round(Dimensions.get("window").width);
export const screenHeight = Math.round(Dimensions.get("window").height);

export const BOTTOM_TAB_IMAGE = [
  "/asset/homeicon.png",
  "/asset/shopicon.png",
  "/asset/playicon.png",
  "/asset/myinfoicon.png",
  "/asset/rankingicon.png",
];
