const express = require('express');

// bekérjük az egyes útvonalak kontrollerjét
const getAllUsers = require('../controllers/getAllUsers');
// const getOneProductById = require('../controllers/getOneProductById');
// const newProduct = require('../controllers/newProduct');
// TODO 
// const updateProduct = require('../controllers/updateProduct');
// const deleteProduct = require('../controllers/deleteProduct');

const router = express.Router();

//megadjuk melyik útvonalkérésre melyik kontrollert szolgáljuk ki

router.get('/', getAllUsers);
// router.get('/:id', getOneProductById);
// router.post('/newproduct', newProduct);
// TODO
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

module.exports = router;
