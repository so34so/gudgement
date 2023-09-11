/// <reference types="nativewind/types" />
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "react-query";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "./queryClient";
import BottomTabNavigator from "./src/navigation/BottomTabNavigator";

if (__DEV__) {
  import("./reactotron");
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }} className="bg-transparent">
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;
