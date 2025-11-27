import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import AddExpenseScreen from "../screens/AddExpenseScreen";
import BillsScreen from "../screens/BillsScreen";
import TokensScreen from "../screens/TokensScreen";
import MpesaCalcScreen from "../screens/MpesaCalcScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddExpense" component={AddExpenseScreen} />
        <Stack.Screen name="Bills" component={BillsScreen} />
        <Stack.Screen name="Tokens" component={TokensScreen} />
        <Stack.Screen name="MpesaCalc" component={MpesaCalcScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
