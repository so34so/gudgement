/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/// <reference types="nativewind/types" />
import { QueryClientProvider } from "@tanstack/react-query";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "./queryClient";
import { WebSocketProvider } from "./src/components/WebSocketContext";
import { WEBSOCKET_URL } from "@env";
import { useEffect } from "react";
import messaging from "@react-native-firebase/messaging";
import PushNotification from "react-native-push-notification";

import CodePush, { CodePushOptions } from "react-native-code-push";
import AppInner from "./AppInner";
import { PERMISSIONS, RESULTS, check, request } from "react-native-permissions";
import { Linking } from "react-native";

if (__DEV__) {
  import("./reactotron");
}

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log("Message handled in the background!", remoteMessage);
});
PushNotification.configure({
  // (optional) 토큰이 생성될 때 실행됨(토큰을 서버에 등록할 때 쓸 수 있음)
  // onRegister: function (token: { os: string; token: string }) {
  //   console.log("TOKEN:", token);
  // },

  // (required) 리모트 노티를 수신하거나, 열었거나 로컬 노티를 열었을 때 실행
  onNotification: function (notification: any) {
    console.log("NOTIFICATION:", notification);
    if (notification.userInteraction) {
      if (notification.channelId === "만보기") {
        // console.log("url open");
      }
      if (notification.channelId === "분석") {
        if (notification.message || notification.data.message) {
          Linking.openURL("gudgement://mypage");
        }
      }
      if (notification.channelId === "fcm_fallback_notification_channel") {
        // Linking.openURL("gudgement://mypage");
      }
      // process the notification
      Linking.openURL("gudgement://mypage");
    }
  },

  // (optional) 등록한 액션을 눌렀고 invokeApp이 false 상태일 때 실행됨, true면 onNotification이 실행됨 (Android)
  onAction: function (notification: any) {
    // console.log("ACTION:", notification.action);
    console.log("NOTIFICATION ACTION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err: Error) {
    console.error(err.message, err);
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

// 채널은 여러개 만들어 둘 수 있음
PushNotification.createChannel(
  {
    channelId: "만보기", // (required)
    channelName: "앱 전반", // (required)
    channelDescription: "앱 실행하는 알림", // (optional) default: undefined.
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) =>
    console.log(`createChannel 만보기 returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

PushNotification.createChannel(
  {
    channelId: "분석", // (required)
    channelName: "앱 전반", // (required)
    channelDescription: "앱 실행하는 알림", // (optional) default: undefined.
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    importance: 4, // (optional) default: 4. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  },
  (created: boolean) => console.log(`createChannel 분석 returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

// const codePushOptions: CodePushOptions = {
//   checkFrequency: CodePush.CheckFrequency.MANUAL,
//   // 언제 업데이트를 체크하고 반영할지를 정한다.
//   // ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
//   // ON_APP_START은 앱이 실행되는(켜지는) 순간을 의미

//   installMode: CodePush.InstallMode.IMMEDIATE,
//   mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
//   // 업데이트를 어떻게 설치할 것인지 (IMMEDIATE는 강제설치를 의미)
// };

// 푸시 알림 권한 꺼져있으면 켜달라고 요청함
check(PERMISSIONS.ANDROID.POST_NOTIFICATIONS).then(async result => {
  console.log("result", result);
  if (
    result === RESULTS.DENIED ||
    result === RESULTS.BLOCKED ||
    result === RESULTS.UNAVAILABLE
  ) {
    await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
  }
});

function App(): JSX.Element {
  useEffect(() => {
    CodePush.sync(
      {
        installMode: CodePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
        updateDialog: {
          mandatoryUpdateMessage:
            "필수 업데이트가 있어 설치 후 앱을 재시작합니다.",
          mandatoryContinueButtonLabel: "재시작",
          optionalIgnoreButtonLabel: "나중에",
          optionalInstallButtonLabel: "재시작",
          optionalUpdateMessage: "업데이트가 있습니다. 설치하시겠습니까?",
          title: "업데이트 안내",
        },
      },
      status => {
        console.log(`Changed ${status}`);
      },
      downloadProgress => {
        // 여기서 몇 % 다운로드되었는지 체크 가능
      },
    ).then(status => {
      console.log(`CodePush ${status}`);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }} className="bg-transparent">
        <WebSocketProvider url={WEBSOCKET_URL}>
          <AppInner />
        </WebSocketProvider>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

const codePushOptions: CodePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  // 언제 업데이트를 체크하고 반영할지를 정한다.
  // ON_APP_RESUME은 Background에서 Foreground로 오는 것을 의미
  // ON_APP_START는 앱이 실행되는 순간을 의미
  // MANUAL은 수동으로 지정 가능

  installMode: CodePush.InstallMode.IMMEDIATE,
  mandatoryInstallMode: CodePush.InstallMode.IMMEDIATE,
  // 업데이트를 어떻게 설치할 것인지(IMMEDIATE는 강제설치를 의미)
};

export default CodePush(codePushOptions)(App);
