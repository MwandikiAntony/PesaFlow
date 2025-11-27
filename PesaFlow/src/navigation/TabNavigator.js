import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

// Screens
import HomeScreen from "../screens/HomeScreen";
import ExpensesScreen from "../screens/ExpensesScreen";
import BillsScreen from "../screens/BillsScreen";
import TokensScreen from "../screens/TokensScreen";
import SettingsScreen from "../screens/SettingsScreen";

import colors from "../theme/colors";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "#555",
        tabBarStyle: { paddingVertical: 5, height: 60 },
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            case "Expenses":
              iconName = "wallet-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            case "Bills":
              iconName = "file-document-outline";
              return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
            case "Tokens":
              iconName = "flash-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
            case "Settings":
              iconName = "settings-outline";
              return <Ionicons name={iconName} size={size} color={color} />;
          }
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Expenses" component={ExpensesScreen} />
      <Tab.Screen name="Bills" component={BillsScreen} />
      <Tab.Screen name="Tokens" component={TokensScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}
