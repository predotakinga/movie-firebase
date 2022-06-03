import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigation.navigate("Home");
      }
    });
    return unsubscribe;
  }, []);

  const handleSignUp = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("registered:", user.email);
      })
      .catch((error) => alert(error.message));
  };

  const HandleLogIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        console.log("logged in:", user.email);
        navigation.navigate("Home");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View>
        <Text style={styles.title}>Login</Text>
        <TextInput
          placeholder="email"
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={HandleLogIn} style={styles.button}>
            <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
              Sign in
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSignUp} style={styles.button}>
            <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#223343",
    alignItems: "center",
    alignContent: "center",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    width: 350,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 60,
    marginTop: "20%",
    textAlign: "center",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  button: {
    backgroundColor: "#223343",
    borderWidth: 2,
    borderColor: "white",
    width: 200,
    height: 50,
    marginTop: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    fontSize: 20,
    padding: 20,
    fontWeight: "300",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    color: "#fff",
    backgroundColor: "#445565",
    fontSize: 18,
    fontWeight: "700",
    padding: 20,
  },
  modal: {
    backgroundColor: "#223343",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  year: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
    marginTop: -20,
  },
  plot: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "200",
    textAlign: "center",
    marginTop: 20,
  },
  actors: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
