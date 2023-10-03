import React, { createContext, useContext, useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";

// 웹소켓 컨텍스트 생성
const WebSocketContext = createContext<CompatClient | null>(null);

export const WebSocketProvider: React.FC<{
  url: string;
  children: JSX.Element;
}> = ({ url, children }) => {
  const [client, setClient] = useState<CompatClient | null>(null);

  useEffect(() => {
    const newClient = Stomp.over(new SockJS(url));

    newClient.connect({}, frame => {
      console.log("Connected: " + frame);

      // useEffect 내에서 웹소켓 연결 후에 상태를 업데이트하여 context provider로 전달함
      setClient(newClient); // 연결 후 client 상태 업데이트
    });

    // Unmount 시점에 웹소켓 연결 종료
    return () => {
      if (newClient.connected) {
        newClient.disconnect();
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
