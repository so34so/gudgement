import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CommonType } from "../types/CommonType";
import MyPage from "../pages/MyPage";
import Pedometer from "../pages/Pedometer";
import Analyze from "../pages/Analyze";
import SettingAccount from "../pages/SettingAccount";
import AnalyzeGoal from "../pages/AnalyzeGoal";
import AnalyzeDetail from "../pages/AnalyzeDetail";

function MyPageNavigator() {
  const Stack = createNativeStackNavigator<CommonType.RootStackParamList>();
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name="MyPageDetail"
        component={MyPage}
        options={{ title: "MyPageDetail" }}
      />
      <Stack.Screen
        name="Pedometer"
        component={Pedometer}
        options={{ title: "Pedometer" }}
      />
      <Stack.Screen
        name="Analyze"
        component={Analyze}
        options={{ title: "Analyze" }}
      />
      <Stack.Screen
        name="SettingAccount"
        component={SettingAccount}
        options={{ title: "SettingAccount" }}
      />
      <Stack.Screen
        name="AnalyzeGoal"
        component={AnalyzeGoal}
        options={{ title: "AnalyzeGoal" }}
      />
      <Stack.Screen
        name="AnalyzeDetail"
        component={AnalyzeDetail}
        options={{ title: "AnalyzeDetail" }}
      />
    </Stack.Navigator>
  );
}

export default MyPageNavigator;
