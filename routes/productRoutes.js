const express = require('express');

// bekérjük az egyes útvonalak kontrollerjét
const getAllProducts = require('../controllers/products/getAllProducts.js');
const getOneProductById = require('../controllers/products/getOneProductById.js');
const newProduct = require('../controllers/products/newProduct.js');
const updateProduct = require('../controllers/products/updateProduct.js');
const deleteProduct = require('../controllers/products/deleteProduct.js');

const router = express.Router();

//megadjuk melyik útvonalkérésre melyik kontrollert szolgáljuk ki

router.get('/', getAllProducts);
router.get('/:id', getOneProductById);
router.post('/newproduct', newProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
