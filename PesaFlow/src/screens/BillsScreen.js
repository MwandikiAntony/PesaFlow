import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import colors from "../theme/colors";
import api from "../api/api";

export default function BillsScreen() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBills = async () => {
    try {
      const res = await api.get("/bills");
      setBills(res.data);
    } catch (err) {
      alert("Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  if (loading) return <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Bills</Text>

      <FlatList
        data={bills}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.amount}>KES {item.amount}</Text>
            <Text style={styles.due}>Due: {new Date(item.dueDate).toLocaleDateString()}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  heading: { fontSize: 28, fontWeight: "700", color: colors.secondary, marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    borderLeftWidth: 8,
    borderLeftColor: colors.primary,
  },
  title: { fontSize: 18, fontWeight: "600" },
  amount: { fontSize: 16, color: colors.text, marginTop: 5 },
  due: { fontSize: 14, color: "#777", marginTop: 5 },
});
