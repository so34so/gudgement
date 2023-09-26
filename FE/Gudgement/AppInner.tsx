import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { CommonType } from "./src/types/CommonType";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import PlayNavigator from "./src/navigation/PlayNavigator";
import Login from "./src/pages/Login";
import SettingEmail from "./src/pages/SettingEmail";
import SettingName from "./src/pages/SettingName";
import SettingAccount from "./src/pages/SettingAccount";
import MyPageNavigator from "./src/navigation/MyPageNavigator";
import messaging from "@react-native-firebase/messaging";
import { Linking } from "react-native";

function AppInner() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer
      linking={{
        prefixes: ["https://gudgement.com", "gudgement://"],
        config: {
          screens: {
            MyPageNavigator: "/mypage",
          },
        },
        subscribe(listener) {
          const onReceiveURL = ({ url }: { url: string }) => listener(url);

          // Listen to incoming links from deep linking
          const subscription = Linking.addEventListener("url", onReceiveURL);

          // Listen to firebase push notifications
          const unsubscribeNotification = messaging().onNotificationOpenedApp(
            message => {
              const url = message.data?.url;

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
      }}
    >
      {!isLoggedIn ? (
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
