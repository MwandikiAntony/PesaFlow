import AppNavigator from "./src/navigation/AppNavigator";
import { useEffect } from "react";
import { syncOfflineExpenses } from "./src/utils/offline";




export default function App() {
  useEffect(() => {
  syncOfflineExpenses();
}, []);
  return <AppNavigator />;

}
