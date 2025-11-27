import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../api/api";

// Save expense locally first
export const saveExpenseOffline = async (expense) => {
  try {
    let offline = await AsyncStorage.getItem("offline_expenses");
    offline = offline ? JSON.parse(offline) : [];
    offline.push(expense);
    await AsyncStorage.setItem("offline_expenses", JSON.stringify(offline));
  } catch (err) {
    console.log("Offline save error:", err);
  }
};

// Sync offline expenses with backend
export const syncOfflineExpenses = async () => {
  try {
    let offline = await AsyncStorage.getItem("offline_expenses");
    offline = offline ? JSON.parse(offline) : [];

    for (let exp of offline) {
      await api.post("/expense", exp);
    }

    await AsyncStorage.removeItem("offline_expenses");
    console.log("Offline expenses synced successfully!");
  } catch (err) {
    console.log("Sync failed:", err);
  }
};
