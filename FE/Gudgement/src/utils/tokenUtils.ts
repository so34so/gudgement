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

// AxiosRequestConfig 인터페이스를 확장하여 새로운 인터페이스를 정의
interface AdaptAxiosRequestConfig extends AxiosRequestConfig {
  headers: AxiosRequestHeaders; // 헤더에 대한 타입 명시적으로 지정
}
// Axios 인스턴스 생성
export const fetchApi: AxiosInstance = axios.create();

// 요청 전에 실행되는 인터셉터
fetchApi.interceptors.request.use(
  // 요청을 보내기 전에 실행되는 비동기 콜백 함수, 매개변수 config는 현재 요청의 설정 객체
  async (config): Promise<AdaptAxiosRequestConfig> => {
    // 액세스 토큰을 요청 헤더에 추가
    // 로그인 데이터 가져오기
    const getAccessTokenForApi = await getAsyncData<string>("accessToken");

    if (getAccessTokenForApi) {
      // 헤더에 토큰 추가
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
  response => response, // 응답이 성공적일 경우 그대로 반환
  async (error: AxiosError<CommonType.Terror>) => {
    const originalRequest = error.config as AdaptAxiosRequestConfig;

    if (error.response) {
      const errorCode = error.response.data.code;
      const errorMessage = error.response.data.message;
      let newAccessToken;
      switch (errorCode) {
        case "T-001":
          reactotron.log!(errorMessage); // 올바른 토큰 아님
          break;
        case "T-002":
          reactotron.log!("엑세스 토큰 기간 만료", errorMessage); // Access 토큰 기간 만료
          await refreshToken(); // Refresh Token으로 새 AccessToken을 받아옴
          newAccessToken = await getAccessToken();
          reactotron.log!("뉴 엑세스", newAccessToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // 새 AccessToken으로 업데이트
          return fetchApi(originalRequest); // 업데이트된 AccessToken으로 다시 원래의 request 재요청
        case "T-003":
          reactotron.log!("리프레시 토큰 기간 만료", errorMessage); // Refresh 토큰 기간 만료
          logoutUser(); // 사용자를 로그아웃 시킴
          break;
        case "T-004":
          reactotron.log!(errorMessage); // 토큰 없음
          break;
        case "T-005":
          reactotron.log!(errorMessage); // 토큰에 담긴 유저와 토큰 보낸 유저 다름
          break;
      }
    }
    return Promise.reject(error);
  },
);

export default fetchApi;
