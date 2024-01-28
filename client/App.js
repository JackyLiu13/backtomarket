// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { AppRegistry } from "react-native";
//import App from './App'; // Adjust the path as needed
import { name as appName } from "./app.json";

AppRegistry.registerComponent(appName, () => App);

import SplashScreen from "./screens/SplashScreen";
import HomeScreen from "./screens/HomeScreen";
import InfoScreen from "./screens/InfoScreen";
import NegotiateScreen from "./screens/NegotiateScreen";
import TestPage from "./screens/TestPage";
import SuccessfulScreen from "./screens/SucessufulScreen";
import FailedTradeScreen from "./screens/FailedTradeScreen";
import NegotiatorScreen from "./screens/NegotiatorScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Info" component={InfoScreen} />
        <Stack.Screen name="Negotiate" component={NegotiateScreen} />
        <Stack.Screen name="TestPage" component={TestPage} />
        <Stack.Screen name="Negotiator" component={NegotiatorScreen} />
        <Stack.Screen name="Success" component={SuccessfulScreen} />
        <Stack.Screen name="Failed" component={FailedTradeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
