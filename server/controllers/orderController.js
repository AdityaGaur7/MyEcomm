import Razorpay from "razorpay";
import crypto from "crypto";
import Order from "../models/orderModel.js"; // Ensure the path to your Order model is correct

const RAZORPAY_KEY = process.env.RAZORPAY_KEY;
const RAZORPAY_SECRET = process.env.RAZORPAY_SECRET;

const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY,
  key_secret: RAZORPAY_SECRET,
});

// Create Razorpay order
export const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Verify payment and store order in DB
export const verifyPayment = async (req, res) => {
  try {
    const { response, products, buyer, address, totalPrice } = req.body;

    // Verify payment signature
    const body = response.razorpay_order_id + "|" + response.razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === response.razorpay_signature) {
      // Create and save order in DB
      const newOrder = new Order({
        products,
        payment: response,
        buyer,
        address,
        totalPrice,
        status: "Not Process",
      });

      await newOrder.save();

      res.status(200).json({ success: true, order: newOrder });
    } else {
      res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

