const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, // ✅ Explicitly store 'id'
    name: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
    category: { type: String, required: true },
    sizes: { type: [String] },
    original_price: { type: Number },
    description: { type: String, required: true },
    product_details: { type: [String] },
    type: { type: [String] },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
