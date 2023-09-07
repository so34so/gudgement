/// <reference types="nativewind/types" />
import { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "react-query";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "./queryClient";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";
import Login from "./src/pages/Login";

if (__DEV__) {
  import("./reactotron");
}

function App(): JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  }
 
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }} className="bg-sub01">
        <NavigationContainer>
          {isLoggedIn ? (
            <BottomTabNavigator />
          ) : (
            <Login />
          )}
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}


export default App;
