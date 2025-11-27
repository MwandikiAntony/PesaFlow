import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import Animated, { FadeInUp } from "react-native-reanimated";

import colors from "../theme/colors";
import api from "../api/api";
import { syncOfflineExpenses } from "../utils/offline";

const screenWidth = Dimensions.get("window").width;

export default function ExpensesScreen({ navigation }) {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch expenses from backend and sync offline ones
  const fetchExpenses = async () => {
    try {
      await syncOfflineExpenses(); // sync first

      const res = await api.get("/expense");
      setExpenses(res.data);
    } catch (err) {
      console.log("Failed to fetch expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  // Transform data for PieChart (category wise)
  const chartData = Object.entries(
    expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + parseFloat(curr.amount);
      return acc;
    }, {})
  ).map(([name, amount], index) => ({
    name,
    amount,
    color: [colors.primary, colors.secondary, colors.accent, "#FF5733", "#33FFCE"][index % 5],
    legendFontColor: "#333",
    legendFontSize: 12,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Expenses</Text>

      {expenses.length > 0 && (
        <PieChart
          data={chartData}
          width={screenWidth - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            color: (opacity = 1) => `rgba(0, 167, 82, ${opacity})`,
          }}
          accessor="amount"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
      )}

      <FlatList
        data={expenses}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ paddingTop: 20 }}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100)}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate("ExpenseDetail", { expense: item })}
            >
              <Text style={styles.title}>{item.category}</Text>
              <Text style={styles.amount}>KES {item.amount}</Text>
              {item.note ? <Text style={styles.note}>{item.note}</Text> : null}
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  heading: { fontSize: 28, fontWeight: "700", color: colors.secondary },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: colors.primary,
  },
  title: { fontSize: 18, fontWeight: "600" },
  amount: { fontSize: 16, color: colors.text, marginTop: 5 },
  note: { fontSize: 14, color: "#777", marginTop: 5 },
});
