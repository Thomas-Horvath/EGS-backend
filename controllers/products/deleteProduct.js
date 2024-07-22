const Product = require('../../models/product.js');

const deleteProductById = async (req, res) => {
    try {
        const id = Number(req.params.id); // Megkapjuk a kérés URL-jében a termék ID-jét

        const deletedProduct = await Product.findOneAndDelete({ ProductID: id });

        if (!deletedProduct) {
            res.status(404).send([{ error: 'A termék nem található!' }]);
        } else {
            res.json({ message: 'A termék sikeresen törölve!', deletedProduct });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = deleteProductById;
