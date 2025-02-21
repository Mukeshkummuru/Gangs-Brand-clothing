require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const fs = require("fs");

const Product = require("./models/Product"); // Import Product model
const productRoutes = require("./routes/Productroutes");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static images from "gangsimages" folder
app.use("/gangsimages", express.static(path.join(__dirname, "gangsimages"), { maxAge: "7d" }));

// ✅ Set BASE_URL for images dynamically
app.use((req, res, next) => {
    process.env.BASE_URL = `${req.protocol}://${req.get("host")}/`;
    next();
});

// ✅ Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(async () => {
        console.log("✅ Connected to MongoDB");
        await seedProducts(); // Insert products into MongoDB
    })
    .catch(err => console.error("❌ MongoDB connection error:", err));

// ✅ Function to insert products.json data into MongoDB
const seedProducts = async () => {
    try {
        const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, "products.json"), "utf-8"));

        for (let product of productsData) {
            const existingProduct = await Product.findOne({ id: product.id });

            if (!existingProduct) {
                await Product.create(product);
                console.log(`✅ Added product: ${product.name}`);
            } else {
                console.log(`⚠️ Product already exists: ${product.name}`);
            }
        }
    } catch (error) {
        console.error("❌ Error inserting products:", error);
    }
};

// ✅ Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
