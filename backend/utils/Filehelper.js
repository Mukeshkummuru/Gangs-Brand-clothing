const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../products.json");

let productsCache = null;
let lastFetchTime = 0;

const getProducts = () => {
    // Cache for 5 minutes (300000 milliseconds)
    if (productsCache && Date.now() - lastFetchTime < 300000) {
        return productsCache;
    }

    try {
        const data = fs.readFileSync(productsFilePath, "utf8");
        productsCache = JSON.parse(data);
        lastFetchTime = Date.now();

        // Pre-process image URLs once
        productsCache = productsCache.map(product => ({
            ...product,
            images: product.images.map(img =>
                img.startsWith("http") ? img : `http://localhost:5000${img}`
            )
        }));

        return productsCache;
    } catch (error) {
        console.error("Error loading products:", error);
        return [];
    }
};

module.exports = { getProducts };