import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";
import reactotron from "reactotron-react-native";
import { CommonType } from "../types/CommonType";
import axios, { AxiosError, AxiosResponse } from "axios";
import fetchApi from "./tokenUtils";
import Config from "react-native-config";
import { queryClient } from "../../queryClient";

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

export const getAsyncData = async <T>(key: string): Promise<T | null> => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const data = JSON.parse(value) as T;
      return data;
    }
  } catch (error) {
    reactotron.log!(error);
  }

  return null;
};

export const removeAsyncData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    reactotron.log!(error);
  }
};

export const refreshToken = async () => {
  try {
    const getRefreshToken = await getAsyncData<string>("refreshToken");
    const getId = await getAsyncData<string>("id");
    const getEmail = await getAsyncData<string>("email");

    if (!getRefreshToken) {
      throw new Error("Refresh token이 없습니다.");
    }

    const sendBE = {
      id: getId,
      email: getEmail,
    };

    const response: AxiosResponse<CommonType.TrefreshToken> = await axios.post(
      `${Config.API_URL}/member/token/refresh`,
      sendBE,
      {
        headers: {
          Authorization: `Bearer ${getRefreshToken}`,
        },
      },
    );
    setAsyncData("accessToken", response.data.accessToken);
    const getAccessToken = await getAsyncData<string>("accessToken");
    return getAccessToken;
  } catch (error) {
    logoutUser();
    return Promise.reject(error);
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return getAsyncData<string>("accessToken");
};

export const logoutUser = async () => {
  try {
    await removeAsyncData("accessToken");
    await removeAsyncData("refreshToken");
    await removeAsyncData("id");

    queryClient.invalidateQueries(["isLoggedIn"]);
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

export const ANALYZE_MONTH_IMAGE = [
  "/asset/analyzeNone.png",
  "/asset/anaylzeMonthOne.png",
  "/asset/anaylzeMonthTwo.png",
  "/asset/anaylzeMonthThree.png",
];

export const fetchUser = async (): Promise<CommonType.Tuser | null> => {
  const getAccessTokenFetchUser = await getAsyncData<string>("accessToken");
  console.log("accessToken", getAccessTokenFetchUser);
  if (!getAccessTokenFetchUser) {
    return null;
  }
  try {
    const response: AxiosResponse<CommonType.Tuser> = await fetchApi.get(
      `${Config.API_URL}/member/loadMyInfo`,
    );
    response.data.email && setAsyncData("email", response.data.email);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<CommonType.Terror>;
    if (axiosError.response) {
      const errorMessage = axiosError.response.data.message;
      reactotron.log!(errorMessage);
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
