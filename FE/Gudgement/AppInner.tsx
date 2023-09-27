import React, { useState } from "react";
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
import { Linking } from "react-native";
import reactotron from "reactotron-react-native";
import PushNotification from "react-native-push-notification";

function AppInner() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
                // Any custom logic to check whether the URL needs to be handled

                // Call the listener to let React Navigation handle the URL
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
          <Stack.Screen
            name="바텀"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
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
          <Stack.Screen
            name="BottomTabNavigator"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

export default AppInner;
