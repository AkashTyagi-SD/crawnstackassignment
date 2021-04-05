import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SongDetails from "../screens/SongDetails";
import SongsList from "../screens/SongsList";
import SplashScreen from "../screens/SplashScreen";
const Stack = createStackNavigator();

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1E90FF",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        headerTitleAlign: "center",
      }}
    >
    <Stack.Screen
      name="splash"
      component={SplashScreen}
      options={{headerShown:false}}
    />
      <Stack.Screen
        name="songslist"
        component={SongsList}
        options={{ title: "Songs"}}
      />
      <Stack.Screen
        name="songsdetails"
        component={SongDetails}
        options={{ title: "Songs Details" }}
      />
    </Stack.Navigator>
  );
}
function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
