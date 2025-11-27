import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import colors from "../theme/colors";
import api from "../api/api";

export default function TokensScreen() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTokens = async () => {
    try {
      const res = await api.get("/tokens"); // backend endpoint for token history
      setTokens(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  if (loading) return <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1 }} />;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Electricity Tokens</Text>

      <FlatList
        data={tokens}
        keyExtractor={(item) => item._id}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 100)}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.amount}>KES {item.amount}</Text>
              <Text style={styles.token}>Token: {item.token}</Text>
              <Text style={styles.date}>Date: {new Date(item.date).toLocaleDateString()}</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  heading: { fontSize: 28, fontWeight: "700", color: colors.secondary, marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 4,
    borderLeftWidth: 6,
    borderLeftColor: colors.secondary,
  },
  amount: { fontSize: 18, fontWeight: "700", color: colors.primary },
  token: { fontSize: 16, color: colors.text, marginTop: 5 },
  date: { fontSize: 14, color: "#777", marginTop: 5 },
});
