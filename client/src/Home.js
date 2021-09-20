import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.payBtn, styles.stripe]}
        onPress={() => navigation.navigate("Stripe")}
      >
        <Text style={styles.text}>Stripe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.payBtn, styles.paypal]}>
        <Text style={styles.text}>Pay with Paypal</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
    padding: 40,
  },
  payBtn: {
    width: "100%",
    height: 50,
    borderRadius: 4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  stripe: {
    backgroundColor: "#008cdd",
  },
  paypal: {
    backgroundColor: "#003087",
  },
  text: {
    color: "white",
  },
});
