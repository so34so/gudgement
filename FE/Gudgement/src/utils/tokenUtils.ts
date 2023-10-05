import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  AxiosRequestHeaders,
} from "axios";

import {
  getAccessToken,
  getAsyncData,
  logoutUser,
  refreshToken,
} from "../utils/common";

import reactotron from "reactotron-react-native";

import { CommonType } from "../types/CommonType";

interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders;
}

export const fetchApi: AxiosInstance = axios.create();

fetchApi.interceptors.request.use(
  async (config): Promise<AdaptAxiosRequestConfig> => {
    const getAccessTokenForApi = await getAsyncData<string>("accessToken");

    if (getAccessTokenForApi) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${getAccessTokenForApi}`;
    }
    return config;
  },
  (error: AxiosError<CommonType.Terror>) => {
    return Promise.reject(error);
  },
);

fetchApi.interceptors.response.use(
  response => response,
  async (error: AxiosError<CommonType.Terror>) => {
    const originalRequest = error.config as AdaptAxiosRequestConfig;
    if (error.response) {
      const errorCode = error.response.data.code;
      const errorMessage = error.response.data.message;
      let newAccessToken;
      switch (errorCode) {
        case "T-001":
          reactotron.log!(errorMessage);
          break;
        case "T-002":
          reactotron.log!(errorMessage);
          await refreshToken();
          newAccessToken = await getAccessToken();
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return fetchApi(originalRequest);
        case "T-003":
          reactotron.log!(errorMessage);
          logoutUser();
          break;
        case "T-004":
          reactotron.log!(errorMessage);
          logoutUser();
          break;
        case "T-005":
          reactotron.log!(errorMessage);
          break;
        case "E-003":
          reactotron.log!(errorMessage);
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default fetchApi;
