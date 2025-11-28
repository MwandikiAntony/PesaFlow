import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import axios from "axios";
import colors from "../theme/colors";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    if (!name || !email || !password)
      return alert("All fields are required");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });

      alert("Account created. Please log in.");
      navigation.replace("Login");
    } catch (err) {
      alert("Email already exists");
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        <Text style={styles.heading}>Create Your Account</Text>
        <Text style={styles.subText}>Start managing your money smartly</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={setEmail}
        />

        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.btnText}>Create Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.textLink}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: colors.secondary,
  },
  subText: {
    color: "#555",
    marginBottom: 30,
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
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    elevation: 4,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  textLink: {
    color: colors.secondary,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
});
