import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MpesaCalcScreen from "../screens/MpesaCalcScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import TabNavigator from "./TabNavigator";     // Contains HomeScreen + tabs
import AddExpenseScreen from "../screens/AddExpenseScreen";
import ExpensesScreen from "../screens/ExpensesScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>

        {/* Auth Screens */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Main App (Tabs) */}
        <Stack.Screen name="Main" component={TabNavigator} />

        {/* Extra Screens */}
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="ExpenseDetail" component={ExpensesScreen} />
        <Stack.Screen name="MpesaCalcScreen" component={MpesaCalcScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
