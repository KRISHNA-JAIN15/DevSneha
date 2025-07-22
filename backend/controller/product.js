const Product = require("../models/product");

// Add Product
const addProduct = async (req, res) => {
    const { title, description, price, tag } = req.body;
    const imageUrl = req.file?.path;

    try {
        const product = await Product.create({ title, description, price, tag, imageUrl });
        res.status(201).json({ message: "Product added", product });
    } catch (err) {
        res.status(400).json({ error: "Failed to create product" });
    }
};

// Update Product
const updateProduct = async (req, res) => {
    const { title, description, price, tag } = req.body;
    const imageUrl = req.file?.path;

    try {
        const updateData = { title, description, price, tag };
        if (imageUrl) updateData.imageUrl = imageUrl;

        const product = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });
        res.json({ message: "Product updated", product });
    } catch (err) {
        res.status(400).json({ error: "Update failed" });
    }
};

// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted", deletedProduct });
    } catch (err) {
        res.status(500).json({ error: "Delete failed" });
    }
};

// Get All Products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch products" });
    }
};

// Filter by Tag
const getProductsByTag = async (req, res) => {
    try {
        const products = await Product.find({ tag: req.params.tag });
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: "Tag filter failed" });
    }
};

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductsByTag,
};
