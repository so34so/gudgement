import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CommonType } from "../types/CommonType";
import PlaySelect from "../pages/PlaySelect";
import PlayGameStart from "../pages/PlayGameStart";
import PlayGameProgress from "../pages/PlayGameProgress";
import PlayGameResult from "../pages/PlayGameResult";
import PlayGameFinalResult from "../pages/PlayGameFinalResult";
import PlayMatchingWait from "../pages/PlayMatchingWait";
import PlayMatchingQueue from "../pages/PlayMatchingQueue";
import PlayMatchingQueueWait from "../pages/PlayMatchingQueueWait";
function PlayNavigator() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="PlaySelect"
      screenOptions={{ headerShown: false, animation: "none" }} // 전환 효과 사용 안 함
    >
      <Stack.Screen
        name="PlaySelect"
        component={PlaySelect}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayMatchingWait"
        component={PlayMatchingWait}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayMatchingQueue"
        component={PlayMatchingQueue}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayMatchingQueueWait"
        component={PlayMatchingQueueWait}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayGameStart"
        component={PlayGameStart}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayGameProgress"
        component={PlayGameProgress}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayGameResult"
        component={PlayGameResult}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayGameFinalResult"
        component={PlayGameFinalResult}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default PlayNavigator;
