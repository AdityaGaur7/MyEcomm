import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Products" },
                quantity: { type: Number },
            },
        ],
        paymentIntent: {}, // Razorpay payment details
        buyer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        address: { type: String },
        status: {
            type: String,
            default: "pending",
            enum: ["pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        },
        totalPrice: { type: Number },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
