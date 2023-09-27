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
import Splash from "./src/pages/Splash";
import messaging from "@react-native-firebase/messaging";
import reactotron from "reactotron-react-native";
import { getAsyncData } from "./src/utils/common";

function AppInner() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        console.log("phone token", token);
        // dispatch(userSlice.actions.setPhoneToken(token));
        // return axios.post(`${Config.API_URL}/phonetoken`, { token });
      } catch (error) {
        console.error(error);
      }
    }
    getToken();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log("[Remote Message] ", JSON.stringify(remoteMessage));
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const checkIsLoggedIn = async () => {
      try {
        const loginData = (await getAsyncData(
          "loginData",
        )) as CommonType.TloginData;
        reactotron.log!("loginData 확인 성공!", loginData);

        if (loginData.info === 4) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        reactotron.log!("loginData 확인 실패!", error);
      }
    };
    checkIsLoggedIn();
  }, []);

  return (
    <NavigationContainer>
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
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{ headerShown: false }}
          />
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
