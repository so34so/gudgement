import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions, BackHandler } from "react-native";
import reactotron from "reactotron-react-native";
import { CommonType } from "../types/CommonType";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "@env";
import fetchApi from "./tokenUtils";

export const BOTTOM_TAB_MENU = ["홈", "상점", "플레이", "내 정보", "랭킹"];

export const textShadow = {
  textShadowColor: "rgba(0, 0, 0, 0.5)",
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 5,
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

// 데이터 삭제
export const removeAsyncData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    reactotron.log!(error);
  }
};

// Refresh Token으로 새 AccessToken 받아오기
export const refreshToken = async () => {
  try {
    // AsyncStorage에서 refreshToken 가져오기
    const getRefreshToken = await getAsyncData<string>("refreshToken");

    if (!getRefreshToken) {
      reactotron.log!("Refresh token이 없습니다.");
      throw new Error("Refresh token이 없습니다.");
    }

    reactotron.log!("Refresh token으로 발급받는 중..", getRefreshToken);

    // 서버에 요청 보내서 새 AccessToken 받아옴
    const response: AxiosResponse<CommonType.TrefreshToken> = await axios.post(
      `${API_URL}/member/token/refresh`,
      null,
      {
        headers: {
          Authorization: `Bearer ${getRefreshToken}`,
        },
      },
    );
    reactotron.log!("refreshToken으로 accessToken 발급", response.data);
    // 새 AccessToken 저장
    setAsyncData("accessToken", response.data.accessToken);
    const getAccessToken = await getAsyncData<string>("accessToken");
    reactotron.log!("새 accessToken 저장 성공!", getAccessToken);
    return getAccessToken;
  } catch (error) {
    reactotron.log!("리프레시 토큰 기간 만료", error); // Refresh 토큰 기간 만료
    logoutUser(); // 사용자를 로그아웃 시킴
    return Promise.reject(error);
  }
};

// 현재 저장된 AccessToken 가져오기
export const getAccessToken = async (): Promise<string | null> => {
  return getAsyncData<string>("accessToken");
};

// 사용자 로그아웃 처리
export const logoutUser = async () => {
  try {
    // 모든 인증 정보 삭제 (여기서는 accessToken과 refreshToken만 삭제하였음)
    await removeAsyncData("accessToken");
    await removeAsyncData("refreshToken");
    await AsyncStorage.removeItem("id");
    reactotron.log!("로그아웃 시킬게요..");
    const getAccessToken = await getAsyncData<string>("accessToken");
    reactotron.log!("과연?", getAccessToken);
    BackHandler.exitApp();
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

export const ANALYZE_BOX_IMAGE = [
  "/asset/analyzeNone.png",
  "/asset/analyzeSave.png",
  "/asset/analyzeGood.png",
  "/asset/analyzeAlert.png",
  "/asset/analyzeOver.png",
];

export const fetchUser = async (): Promise<CommonType.Tuser | null> => {
  const getAccessTokenFetchUser = await getAsyncData<string>("accessToken");
  console.log("accessToken", getAccessTokenFetchUser);
  if (!getAccessTokenFetchUser) {
    return null;
  }
  try {
    const response: AxiosResponse<CommonType.Tuser> = await fetchApi.get(
      `${API_URL}/member/loadMyInfo`,
      {
        headers: {
          Authorization: `Bearer ${getAccessTokenFetchUser}`,
        },
      },
    );
    reactotron.log!("fetchUser", response);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<CommonType.Terror>;
    if (axiosError.response) {
      const errorMessage = axiosError.response.data.message;
      reactotron.log!("홈 에러", errorMessage);
    }
    throw error;
  }
};

export const checkSpendRate = (
  userData: CommonType.Tuser,
  percent: number,
  setSpend: React.Dispatch<
    React.SetStateAction<{
      text: string;
      color: string;
      img: number;
    }>
  >,
) => {
  if (userData) {
    if (percent <= 0.5) {
      setSpend({
        text: "절약",
        color: "text-black",
        img: 1,
      });
    }
    if (percent > 0.5 && percent <= 0.7) {
      setSpend({
        text: "안정",
        color: "text-black",
        img: 2,
      });
    }
    if (percent > 0.7 && percent < 1.0) {
      setSpend({
        text: "위험",
        color: "text-red",
        img: 3,
      });
    }
    if (percent >= 1.0) {
      setSpend({
        text: "초과",
        color: "text-red",
        img: 4,
      });
    }
  }
};
