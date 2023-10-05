import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
} from "react";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

// 웹소켓 컨텍스트 생성
const WebSocketContext = createContext<CompatClient | null>(null);

export const WebSocketProvider: React.FC<{
  url: string;
  children: JSX.Element;
}> = ({ url, children }) => {
  const [client, setClient] = useState<CompatClient | null>(null);
  const reconnectTimeoutIdRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let newClient: CompatClient;

    const connectAndSetupListeners = () => {
      newClient = Stomp.over(new SockJS(url));

      newClient.onConnect = frame => {
        console.log("Connected: " + frame);
        setClient(newClient); // 연결 후 client 상태 업데이트
      };

      newClient.onWebSocketClose = () => {
        console.log("WebSocket closed.");
        if (reconnectTimeoutIdRef.current === null) {
          // 아직 재연결 시도 중이 아니라면 재연결을 시도합니다.
          reconnectTimeoutIdRef.current = setTimeout(() => {
            console.log("Reconnecting...");
            connectAndSetupListeners();
          }, 5000);
        }
      };

      newClient.activate(); // 웹소켓 연결 활성화
    };

    connectAndSetupListeners();

    return () => {
      if (newClient && newClient.connected) {
        clearTimeout(reconnectTimeoutIdRef.current as NodeJS.Timeout); // 이미 예약된 재연결 타임아웃을 취소합니다.
        reconnectTimeoutIdRef.current = null; // 재연결 타임아웃 ID를 리셋합니다.
        newClient.deactivate(); // Unmount 시점에 웹소켓 연결 종료
      }
    };
  }, [url]);

  return (
    <WebSocketContext.Provider value={client}>
      {children}
    </WebSocketContext.Provider>
  );
};

// 커스텀 훅으로 컨텍스트 사용하기 쉽게 만들기
export const useWebSocket = () => useContext(WebSocketContext);
