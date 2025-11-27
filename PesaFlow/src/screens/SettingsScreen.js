import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import colors from "../theme/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SettingsScreen({ navigation }) {
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    navigation.replace("Login");
  };

  const syncData = async () => {
    Alert.alert("Syncing", "Offline expenses will be synced when online.");
    // Call your sync function from offline.js
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Settings</Text>

      <TouchableOpacity style={styles.card} onPress={syncData}>
        <Text style={styles.cardText}>Sync Offline Expenses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={logout}>
        <Text style={styles.cardText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  heading: { fontSize: 28, fontWeight: "700", color: colors.secondary, marginBottom: 20 },
  card: { backgroundColor: "#fff", padding: 20, borderRadius: 15, marginBottom: 15, elevation: 4 },
  cardText: { fontSize: 18, fontWeight: "600", color: colors.primary },
});
