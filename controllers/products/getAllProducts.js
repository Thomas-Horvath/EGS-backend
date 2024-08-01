const Product = require('../../models/product.js');
const getFullUrl = require('../../utils/imgUrl.module.js');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // lekérjük a termékeket

        // végig mapelünk rajtuk és módosítjuk a képek urljét
        const updatedProducts = products.map(product => {
            // Itt állítjuk be a full URL-t
            product.ProductPhotoURL = getFullUrl(req, `${product.ProductPhotoURL}`);
            return product;
        });
        
        res.status(200).json(updatedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllProducts;
