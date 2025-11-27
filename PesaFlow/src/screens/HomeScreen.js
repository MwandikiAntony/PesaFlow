import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../theme/colors";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>PesaFlow Dashboard</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AddExpense")}>
        <Text style={styles.cardTitle}>Add Expense</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Bills")}>
        <Text style={styles.cardTitle}>Bills</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("Tokens")}>
        <Text style={styles.cardTitle}>Electricity Tokens</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("MpesaCalc")}>
        <Text style={styles.cardTitle}>M-Pesa Calculator</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    color: colors.primary,
    marginVertical: 20
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 8,
    borderLeftColor: colors.secondary
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.text
  }
});
