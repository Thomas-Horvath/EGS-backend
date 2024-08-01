const fs = require('fs');
const path = require('path');
const Product = require('../../models/product.js');

const deleteProductById = async (req, res) => {
    try {
        const id = Number(req.params.id); // Megkapjuk a kérés URL-jében a termék ID-jét

        const deletedProduct = await Product.findOneAndDelete({ ProductID: id });

        if (!deletedProduct) {
            res.status(404).send([{ error: 'A termék nem található!' }]);
        } else {
            const productImagePath = path.join(__dirname, '../../', deletedProduct.ProductPhotoURL);
            fs.unlink(productImagePath, (err) => {
                if (err) {
                    console.error('Kép törlési hiba:', err);
                    return res.status(500).json({ message: 'A termék törölve, de a kép törlése sikertelen.', error: err });
                }
                res.status(200).json({ message: 'A termék és a kép sikeresen törölve!', deletedProduct });
            });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = deleteProductById;
