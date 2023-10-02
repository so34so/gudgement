import React from "react";
import { NavigationContainer, PathConfigMap } from "@react-navigation/native";
import { CommonType } from "./src/types/CommonType";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import PlayNavigator from "./src/navigation/PlayNavigator";
import Login from "./src/pages/Login";
import SettingEmail from "./src/pages/SettingEmail";
import SettingName from "./src/pages/SettingName";
import SettingAccount from "./src/pages/SettingAccount";
import messaging from "@react-native-firebase/messaging";
import { Linking, Text, View } from "react-native";
import reactotron from "reactotron-react-native";
import PushNotification from "react-native-push-notification";
import { useQuery } from "@tanstack/react-query";
import { fetchUser, getAsyncData } from "./src/utils/common";
import SplashScreen from "react-native-splash-screen";

function AppInner() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  const config: {
    initialRouteName?: keyof CommonType.RootStackParamList;
    screens: PathConfigMap<CommonType.RootStackParamList>;
  } = {
    screens: {
      BottomTabNavigator: {
        screens: {
          MyPageNavigator: {
            screens: {
              MyPageDetail: "mypage",
            },
          },
        },
      },
    },
  };

  /**
   * 카카오 로그인을 하면 id를 받아서 asyncStorage에 저장합니다.
   * 이 때, asyncStorage에 아이디가 있는지 여부를 useQuery를 통해 캐싱하고 있으면
   * 로그인 여부를 판단할 수 있을 것 같아서 아래와 같이 구현했습니다.
   */
  const { data: isLoggedIn, isLoading: isLoggedInLoading } = useQuery<boolean>({
    queryKey: ["isLoggedIn"],
    queryFn: async () => {
      const loginData: number | null = await getAsyncData("id");

      return !!loginData;
    },
  });

  /**
   * 카카오 로그인이 성공했을 때 해당 유저가 처음 로그인이라
   * email이랑 account랑 닉네임을 등록했는지 여부를 판단하기 위한 query입니다.
   *
   * fetchUser를 통해 서버로부터 유저정보를 받아옵니다. 받아온 후 data에 email이 있는지 여부를 판단해서
   * email이 있다면 홈화면으로, 아니라면 이메일 등록화면으로 이동시킵니다.
   */
  const {
    data: user,
    isFetched,
    isLoading: fetchUserInfoLoading,
  } = useQuery({
    queryKey: ["fetchUserInfo"],
    queryFn: () => fetchUser(),
    onError: () => {
      setTimeout(() => {
        SplashScreen.hide();
      }, 100);
    },
  });
  if (isFetched) {
    // 화면전환보다 스플래시 스크린이 너무 빨리 사라져서 user 데이터
    // 다 받아온 후에 강제로 100ms이후에 사라지게끔 구현
    setTimeout(() => {
      SplashScreen.hide();
    }, 100);
  }

  if (isLoggedInLoading || fetchUserInfoLoading) {
    return (
      <View>
        <Text>로딩 중</Text>
      </View>
    );
  }
  return (
    <NavigationContainer
      linking={{
        prefixes: ["gudgement://"],
        config: config,
        subscribe(listener) {
          const onReceiveURL = ({ url }: { url: string }) => listener(url);

          // Listen to incoming links from deep linking
          const subscription = Linking.addEventListener("url", onReceiveURL);

          // Listen to firebase push notifications
          const unsubscribeNotification = messaging().onNotificationOpenedApp(
            message => {
              const url = message.data?.url;
              reactotron.log!("deeplink subscribe", url);

              if (url) {
                listener(url);
              }
            },
          );

          return () => {
            // Clean up the event listeners
            subscription.remove();
            unsubscribeNotification();
          };
        },
        async getInitialURL() {
          PushNotification.popInitialNotification(notification => {
            if (!notification) {
              return;
            }
          });

          // this is the default return
          return Linking.getInitialURL();
        },
      }}
    >
      {isLoggedIn ? (
        <Stack.Navigator>
          {!(user && user.email && user.nickname && user.rate) ? (
            <>
              <Stack.Screen
                name="SettingEmail"
                component={SettingEmail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SettingName"
                component={SettingName}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SettingAccount"
                component={SettingAccount}
                options={{ headerShown: false }}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="BottomTabNavigator"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="바텀"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
              />
            </>
          )}
          <Stack.Screen
            name="PlayNavigator"
            component={PlayNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
