import express from "express";
import cors from "cors";
import paypal from "paypal-rest-sdk";
import Stripe from "stripe";
import dotenv from "dotenv";
const app = express();
app.use(cors());
dotenv.config();

/* paypal.configure({
  mode: "sandbox", // Sandbox or live
  client_id:
    "AdPX-eXxypzPf3BbxMNKGXCbcBENjk2ktHapiqJdkhRi0F_q58RjwzjDJJ-KU5oL2Mo2EjEfnOxm6zot",
  client_secret:
    "EMfdhapPy_8denk4MRfRkcbZpsaAhtRXKxBfKvdtCZaUAqFSPEZavrTAuXndCL2H48s6uKkQokfn3B37",
}); */
const SECRET_KEY = process.env.SECRET_KEY;
const stripe = Stripe(SECRET_KEY, {
  apiVersion: "2020-08-27",
});

app.post("/create-stripe-payment", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: "USD",
      payment_method_types: ["card"],
    });
    const clientSecret = paymentIntent.client_secret;
    res.json({
      clientSecret: clientSecret,
    });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

const PORT = 5000;

app.listen(PORT, "192.168.100.69", () => {
  console.log(`Server is running in port: ${PORT}`);
});
