import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

import colors from "../theme/colors";
import api from "../api/api";

export default function TokensScreen() {
  const [tokens, setTokens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchTokens = async () => {
    try {
      const res = await api.get("/tokens");
      setTokens(res.data || []);
    } catch (error) {
      console.log("Error fetching tokens:", error.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchTokens();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Electricity Tokens</Text>

      {/* Empty State */}
      {tokens.length === 0 && (
        <Text style={styles.empty}>No tokens found yet.</Text>
      )}

      <FlatList
        data={tokens}
        keyExtractor={(item) => item._id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(index * 80)}>
            <TouchableOpacity style={styles.card}>
              <Text style={styles.amount}>KES {item.amount}</Text>
              <Text style={styles.token}>Token: {item.token}</Text>
              <Text style={styles.date}>
                {new Date(item.date).toLocaleString()}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
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
    borderLeftWidth: 6,
    borderLeftColor: colors.secondary,
  },
  amount: { fontSize: 18, fontWeight: "700", color: colors.primary },
  token: { fontSize: 16, color: colors.text, marginTop: 5 },
  date: { fontSize: 14, color: "#777", marginTop: 5 },
});
