import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import colors from "../theme/colors";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { saveExpenseOffline, syncOfflineExpenses } from "../utils/offline";

export default function AddExpenseScreen({ navigation }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

const saveExpense = async () => {
  if (!amount || !category) return alert("Amount and category required");

  const expense = { amount, category, note };

  // Save locally first
  await saveExpenseOffline(expense);

  // Try syncing to backend
  try {
    await api.post("/expense", expense);
    alert("Expense saved!");
  } catch (err) {
    console.log("Will sync later:", err);
    alert("Expense saved offline! Will sync when online.");
  }

  navigation.goBack();
};

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.heading}>Add Expense</Text>

      <TextInput
        placeholder="Amount (KES)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setAmount}
      />

      <TextInput
        placeholder="Category (Food, Matatu, etc.)"
        style={styles.input}
        onChangeText={setCategory}
      />

      <TextInput
        placeholder="Optional note"
        style={[styles.input, { height: 80 }]}
        multiline
        onChangeText={setNote}
      />

      <TouchableOpacity style={styles.button} onPress={saveExpense}>
        <Text style={styles.btnText}>Save Expense</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.secondary,
    marginBottom: 25,
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 17,
    borderRadius: 12,
    marginTop: 10,
    elevation: 4,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 18,
  },
});
