import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import colors from "../theme/colors";

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>
      
      <Text style={styles.welcome}>Welcome Back 👋</Text>
      <Text style={styles.sub}>Your financial day at a glance</Text>

      {/* Quick Actions */}
      <View style={styles.row}>
        <TouchableOpacity style={styles.quickBtn} onPress={() => navigation.navigate("AddExpense")}>
          <Text style={styles.quickText}>+ Expense</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.quickBtn, { backgroundColor: colors.secondary }]} onPress={() => navigation.navigate("Bills")}>
          <Text style={styles.quickText}>Bills</Text>
        </TouchableOpacity>
      </View>

      {/* Cards */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("AddExpense")}>
        <Text style={styles.cardTitle}>Expenses</Text>
        <Text style={styles.cardDesc}>View & Add your daily expenses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { borderLeftColor: colors.primary }]} onPress={() => navigation.navigate("Tokens")}>
        <Text style={styles.cardTitle}>Electricity Tokens</Text>
        <Text style={styles.cardDesc}>Track meter usage & reminders</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, { borderLeftColor: colors.accent }]} onPress={() => navigation.navigate("MpesaCalc")}>
        <Text style={styles.cardTitle}>M-Pesa Calculator</Text>
        <Text style={styles.cardDesc}>Check sending, paybill & withdraw fees</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.background,
  },
  welcome: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.primary,
  },
  sub: {
    color: "#555",
    marginBottom: 25,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  quickBtn: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
  },
  quickText: {
    color: "#fff",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 4,
    borderLeftWidth: 8,
    borderLeftColor: colors.secondary,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.text,
  },
  cardDesc: {
    color: "#777",
    marginTop: 5,
  },
});
