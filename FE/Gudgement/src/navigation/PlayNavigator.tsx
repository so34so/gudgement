import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Low from "../pages/Low";
import Middle from "../pages/Middle";
import Play from "../pages/Play";
import { CommonType } from "../types/CommonType";
import PlaySelect from "../pages/PlaySelect";

function PlayNavigator() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="Play"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="Play"
        component={Play}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlaySelect"
        component={PlaySelect}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Low"
        component={Low}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Middle"
        component={Middle}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default PlayNavigator;
