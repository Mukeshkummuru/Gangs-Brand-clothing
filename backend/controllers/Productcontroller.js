const Product = require("../models/Product");

// ✅ Get All Products from MongoDB
const getAllProducts = async (req, res) => {
    try {
        const { query, category, page = 1, limit = 20 } = req.query;
        let products = await Product.find();

        // Transform image URLs (only needed if they are stored locally)
        products = products.map(product => ({
            ...product._doc,
            images: product.images.map(img => img.startsWith("http") ? img : `${process.env.BASE_URL}${img}`)
        }));

        // Filter products
        const filteredProducts = products.filter((product) => {
            const matchesQuery = query ? product.name.toLowerCase().includes(query.toLowerCase()) : true;
            const matchesCategory = category ? product.category.toLowerCase() === category.toLowerCase() : true;
            return matchesQuery && matchesCategory;
        });

        // Paginate results
        const startIndex = (page - 1) * limit;
        const paginatedProducts = filteredProducts.slice(startIndex, startIndex + limit);

        res.json({
            total: filteredProducts.length,
            page: Number(page),
            totalPages: Math.ceil(filteredProducts.length / limit),
            data: paginatedProducts
        });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Get Product By ID
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ error: "Product not found" });

        res.json({
            ...product._doc,
            images: product.images.map(img => img.startsWith("http") ? img : `${process.env.BASE_URL}${img}`)
        });
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

// ✅ Get Related Products
const getRelatedProducts = async (req, res) => {
    try {
        const { productId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(productId)) {
            return res.status(400).json({ error: "Invalid product ID" });
        }

        const mainProduct = await Product.findById(productId);
        if (!mainProduct) return res.status(404).json({ error: "Main product not found" });

        const relatedProducts = await Product.find({ category: mainProduct.category, _id: { $ne: mainProduct._id } }).limit(4);

        res.json(relatedProducts);
    } catch (error) {
        res.status(500).json({ error: "Server error", details: error.message });
    }
};

module.exports = { getAllProducts, getProductById, getRelatedProducts };
