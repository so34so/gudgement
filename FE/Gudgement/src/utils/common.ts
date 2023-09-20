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

export const setData = async (key: string, value: unknown) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, stringValue);
  } catch (error) {
    Reactotron.log!(error);
  }
};

export const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const data = JSON.parse(value);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return data;
    }
  } catch (error) {
    Reactotron.log!(error);
  }
};

export const removeData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    Reactotron.log!(error);
  }
};

export const containsKey = async (key: string) => {
  try {
    const keys = await AsyncStorage.getAllKeys();
    return keys.includes(key);
  } catch (error) {
    Reactotron.log!(error);
  }
};
