import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
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
  const connectAttemptedRef = useRef(false);

  useEffect(() => {
    const newClient = Stomp.over(new SockJS(url));

    newClient.onConnect = frame => {
      console.log("Connected: " + frame);
      setClient(newClient); // 연결 후 client 상태 업데이트
      connectAttemptedRef.current = false; // 성공적으로 연결되면 재연결 시도 플래그를 리셋함
    };

    newClient.onStompError = error => {
      console.log("STOMP error:", error);

      if (!connectAttemptedRef.current) {
        connectAttemptedRef.current = true; // 처음 실패한 경우에만 재연결 시도 플래그를 설정함

        setTimeout(() => {
          console.log("Reconnecting...");
          newClient.activate(); // 재연결 시도
        }, 5000);
      }
    };

    newClient.activate(); // 웹소켓 연결 활성화

    return () => {
      if (newClient.connected) {
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
