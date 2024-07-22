const Product = require('../../models/product.js');
const getFullUrl = require('../../utils/imgUrl.module.js');

const updateProductById = async (req, res) => {
    try {
        const id = Number(req.params.id); // Megkapjuk a kérés URL-jében a termék ID-jét
        const { ...updateData } = req.body; // Az update-hez szükséges adatok

        const updatedProduct = await Product.findOneAndUpdate({ ProductID: id }, updateData, { new: true });

        if (!updatedProduct) {
            res.status(404).send([{ error: 'A termék nem található!' }]);
        } else {
            updatedProduct.ProductPhotoURL = getFullUrl(req, `${updatedProduct.ProductPhotoURL}`);
            res.json(updatedProduct);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateProductById;
