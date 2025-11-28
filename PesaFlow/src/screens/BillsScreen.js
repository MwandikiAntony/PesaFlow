import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";

import colors from "../theme/colors";
import api from "../api/api";

export default function BillsScreen() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBills = async () => {
    try {
      const res = await api.get("/bills");
      setBills(res.data || []);
    } catch (err) {
      console.log("Bills fetch error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBills();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Bills</Text>

      {/* Empty State */}
      {bills.length === 0 && (
        <Text style={styles.empty}>No bills added yet.</Text>
      )}

      <FlatList
        data={bills}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.amount}>KES {item.amount}</Text>
            <Text style={styles.due}>
              Due: {new Date(item.dueDate).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.secondary,
    marginBottom: 20,
  },
  empty: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
    borderLeftWidth: 8,
    borderLeftColor: colors.primary,
  },
  title: { fontSize: 18, fontWeight: "600" },
  amount: { fontSize: 16, color: colors.text, marginTop: 5 },
  due: { fontSize: 14, color: "#777", marginTop: 5 },
});
