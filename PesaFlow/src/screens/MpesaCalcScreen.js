import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import colors from "../theme/colors";

export default function MpesaCalcScreen() {
  const [amount, setAmount] = useState("");
  const [calcType, setCalcType] = useState("send"); // send | withdraw | paybill
  const [result, setResult] = useState(null);

  const calculateFee = () => {
    let amt = parseFloat(amount);
    if (!amt) return alert("Enter valid amount");

    let fee = 0;

    switch (calcType) {
      case "send":
        fee = amt <= 100 ? 1 : amt <= 500 ? 11 : amt <= 1000 ? 27 : amt <= 1500 ? 33 : amt <= 2500 ? 38 : amt <= 3500 ? 44 : amt <= 5000 ? 52 : amt <= 7500 ? 55 : amt <= 10000 ? 57 : amt <= 15000 ? 60 : amt <= 20000 ? 65 : 0;
        break;
      case "withdraw":
        fee = amt <= 100 ? 0 : amt <= 500 ? 27 : amt <= 1000 ? 32 : amt <= 1500 ? 38 : amt <= 2500 ? 44 : amt <= 3500 ? 49 : amt <= 5000 ? 55 : amt <= 7500 ? 60 : amt <= 10000 ? 65 : amt <= 15000 ? 75 : amt <= 20000 ? 85 : 0;
        break;
      case "paybill":
        fee = 0; // usually no extra fee
        break;
    }

    setResult(fee);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>M-Pesa Fee Calculator</Text>

      <TextInput
        placeholder="Enter amount (KES)"
        style={styles.input}
        keyboardType="numeric"
        onChangeText={setAmount}
        value={amount}
      />

      <View style={styles.row}>
        <TouchableOpacity style={[styles.btn, calcType === "send" && { backgroundColor: colors.primary }]} onPress={() => setCalcType("send")}>
          <Text style={styles.btnText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, calcType === "withdraw" && { backgroundColor: colors.primary }]} onPress={() => setCalcType("withdraw")}>
          <Text style={styles.btnText}>Withdraw</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, calcType === "paybill" && { backgroundColor: colors.primary }]} onPress={() => setCalcType("paybill")}>
          <Text style={styles.btnText}>Paybill</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.calculateBtn} onPress={calculateFee}>
        <Text style={styles.calculateText}>Calculate Fee</Text>
      </TouchableOpacity>

      {result !== null && (
        <Text style={styles.result}>Fee: KES {result.toFixed(2)}</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: colors.background },
  heading: { fontSize: 28, fontWeight: "700", color: colors.secondary, marginBottom: 20 },
  input: { backgroundColor: "#fff", padding: 15, borderRadius: 12, marginBottom: 20, elevation: 2 },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 20 },
  btn: { flex: 1, padding: 12, marginHorizontal: 5, backgroundColor: "#ccc", borderRadius: 10 },
  btnText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  calculateBtn: { backgroundColor: colors.primary, padding: 15, borderRadius: 12, elevation: 4 },
  calculateText: { textAlign: "center", color: "#fff", fontWeight: "700", fontSize: 16 },
  result: { fontSize: 22, fontWeight: "700", color: colors.secondary, marginTop: 20, textAlign: "center" },
});
