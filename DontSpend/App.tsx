/// <reference types="nativewind/types" />
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { QueryClientProvider } from "react-query";
import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { queryClient } from "./queryClient";

if (__DEV__) {
  import("./reactotron");
}



function App(): JSX.Element {

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}


export default App;
