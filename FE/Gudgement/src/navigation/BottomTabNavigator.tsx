import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../pages/Home";
import MyPage from "../pages/MyPage";
import Play from "../pages/Play";
import Ranking from "../pages/Ranking";
import { CommonType } from "../types/CommonType";
import ShopNavigator from "./ShopNavigator";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { BOTTOM_TAB_MENU } from "../utils/common";
import TabBarItem from "../components/TabBarItem";

function BottomTabNavigator() {
  const Tab = createBottomTabNavigator<CommonType.RootStackParamList>();
  const BottomTabComponents = [Home, ShopNavigator, Play, MyPage, Ranking];
  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        tabBarStyle: {
          position: "absolute",
          backgroundColor: "transparent",
          elevation: 0,
          borderTopWidth: 0,
          marginBottom: 80,
        },
        tabBarItemStyle: {
          display: "flex",
          backgroundColor: "transparent",
          height: 110,
        },
        // eslint-disable-next-line react/no-unstable-nested-components
        tabBarLabel: props => {
          return (
            <TouchableOpacity className="w-16 h-8 rounded-md bg-black flex justify-center items-center">
              <View className="w-[95%] h-[92%] border-[1px] border-white rounded-md">
                <Text className="top-[2px] text-center text-white rounded-sm font-bold text-[16px]">
                  {props.children}
                </Text>
              </View>
            </TouchableOpacity>
          );
        },
      }}
    >
      {BOTTOM_TAB_MENU.map((ele, idx) => {
        return (
          <Tab.Screen
            key={ele}
            name={ele as keyof CommonType.RootStackParamList}
            component={BottomTabComponents[idx]}
            options={{
              headerShown: false,
              // eslint-disable-next-line react/no-unstable-nested-components
              tabBarIcon: () => {
                return <TabBarItem item={ele} />;
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
