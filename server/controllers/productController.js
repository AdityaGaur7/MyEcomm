import slugify from "slugify";
import Product from "../models/productModel.js";

export const createProductContoller = async (req, res) => {
    try {
        const { name, price, description, image, category } = req.body;
        if (!name || !price || !description || !image) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const product = new Product({
            name,
            price,
            slug: slugify(name),
            description,
            image,
            category
        });
        await product.save();
        res.status(201).send({
            success: true,
            message: 'Product created successfully',
            product
        });
    } catch (error) {
        res.status(500).send({ message: 'Error creating product', success: false, error });
    }
}

export const getAllProductsController = async (req, res) => {
    try {
        const products = await Product.find().populate('category').sort({ createdAt: -1 });
        res.status(200).send({ success: true, products, message: 'Products fetched successfully', count: products.length });
    }
    catch (error) {
        console.log(error);

        res.status(500).send({ message: 'Error fetching products', success: false, error });
    }
}

export const getSingleProductController = async (req, res) => {
    try {

        const product = await Product
            .findOne({ slug: req.params.slug })
            .populate('category');
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ success: true, product, message: 'Product fetched successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error fetching product', success: false, error });
    }
}

export const updateProductController = async (req, res) => {
    try {

        const { name, price, description, image, category } = req.body;
        if (!name || !price || !description || !image) {
            return res.status(400).send({ message: 'All fields are required' });
        }
        const product = await Product.findByIdAndUpdate(req.params.pid);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.category = category;
        product.slug = slugify(name);
        await product.save();
        res.status(200).send({ success: true, message: 'Product updated successfully', product });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error updating product', success: false, error });
    }
}

export const deleteProductController = async (req, res) => {
    try {

        const product = await Product
            .findByIdAndDelete(req.params.pid);
        if (!product) {
            return res.status(404).send({ message: 'Product not found' });
        }
        res.status(200).send({ success: true, message: 'Product deleted successfully' });
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: 'Error deleting product', success: false, error });
    }
}



