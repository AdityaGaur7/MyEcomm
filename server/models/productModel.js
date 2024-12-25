import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    slug: { type: String, lowercase: true, unique: true },
    image: { type: String, required: true },
    shipping: { type: Boolean }

}, { timestamps: true });
const Product = mongoose.model('Product', productSchema);

export default Product;