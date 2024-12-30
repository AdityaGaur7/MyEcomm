import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Product'

        }],

    payment: {},
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: { type: String },
    status: { type: String, default: 'Not Process', enum: ['Not Process', 'Processing', 'Shipped', 'delivered', 'cancel '] },
    totalPrice: { type: Number },
}, { timestamps: true });


const Order = mongoose.model('Orders', orderSchema);

export default Order;