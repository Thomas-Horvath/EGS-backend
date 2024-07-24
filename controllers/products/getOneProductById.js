const Product = require('../../models/product.js');
const getFullUrl = require('../../utils/imgUrl.module.js');

const getOneProductById = async (req, res) => {
    try {
        const id = Number(req.params.id); 
        const product = await Product.findOne({ ProductID: id }); // lekérjük azt a teméket aminek a ProductId-ja egyezik a kapott id-val.
        if (!product) {
            res.status(404).send([{ error: 'A termék nem található!' }]);
        } else {
            product.ProductPhotoURL = getFullUrl(req, `${product.ProductPhotoURL}`);
            res.json(product);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getOneProductById;
