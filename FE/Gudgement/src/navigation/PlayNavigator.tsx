import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { CommonType } from "../types/CommonType";
import PlaySelect from "../pages/PlaySelect";
import PlayGame from "../pages/PlayGame";
import PlayMatchingWait from "../pages/PlayMatchingWait";
import PlayMatchingQueue from "../pages/PlayMatchingQueue";
function PlayNavigator() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="PlayNavigator"
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
        name="PlayGame"
        component={PlayGame}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default PlayNavigator;
