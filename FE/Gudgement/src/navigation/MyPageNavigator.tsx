import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MyPage from "../pages/MyPage";
import Pedometer from "../pages/Pedometer";
import Analyze from "../pages/Analyze";
import SingleRecords from "../pages/SingleRecords";
import MultiRecords from "../pages/MultiRecords";
import { CommonType } from "../types/CommonType";
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
        name="SingleRecords"
        component={SingleRecords}
        options={{ title: "SingleRecords" }}
      />
      <Stack.Screen
        name="MultiRecords"
        component={MultiRecords}
        options={{ title: "MultiRecords" }}
      />
    </Stack.Navigator>
  );
}

export default MyPageNavigator;
