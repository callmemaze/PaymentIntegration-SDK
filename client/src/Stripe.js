import React, { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from "@stripe/stripe-react-native";
import dotenv from "dotenv";

const Stripe = () => {
  dotenv.config();
  const URL = "http://192.168.100.69:5000";
  const [card, setCard] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const publishable =
    "pk_test_51JbS0mBleIf4KJXkg1mDW4JwXeOeIf4SqHv5S71HDfZhUE6kye2mHi2tFzVlhPrTdOSgMDDlhclp7L5O5nABAKcK00IBHdIVtv";

  const fetchPayment = async () => {
    const response = await fetch(`${URL}/create-stripe-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { clientSecret, error } = await response.json();

    return { clientSecret, error };
  };
  const handlePayment = async () => {
    if (!card?.complete) {
      Alert.alert("Please enter card details");
      return;
    }
    try {
      const { clientSecret, error } = await fetchPayment();
      if (error) {
        console.log("Unable to rocess payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
        });
        if (error) {
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          alert("Payment Successful");
          console.log("Payment", paymentIntent);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <StripeProvider publishableKey={publishable}>
      <View style={styles.container}>
        <View style={styles.card}>
          <CardField
            postalCodeEnabled={true}
            placeholder={{ number: "4242 4242 4242 4242" }}
            cardStyle={{
              textColor: "#000000",
            }}
            style={{
              width: "100%",
              height: 50,
              borderRadius: 0,
            }}
            onCardChange={(card) => setCard(card)}
          ></CardField>
        </View>
        <TouchableOpacity
          style={styles.payBtn}
          disabled={loading}
          onPress={handlePayment}
        >
          <Text style={styles.text}>Pay with Stripe</Text>
        </TouchableOpacity>
      </View>
    </StripeProvider>
  );
};

export default Stripe;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  card: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#008cdd",
    display: "flex",
    justifyContent: "center",
  },
  payBtn: {
    width: 130,
    height: 40,
    backgroundColor: "#008cdd",
    borderRadius: 4,
    marginTop: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
});
