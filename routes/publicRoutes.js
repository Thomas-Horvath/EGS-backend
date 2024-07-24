const express = require('express');

// bekérjük az egyes útvonalak kontrollerjét
const getAllProducts = require('../controllers/products/getAllProducts.js');
const getOneProductById = require('../controllers/products/getOneProductById.js');
const customerRegister = require('../controllers/auth/customerRegister.js');
const login = require('../controllers/auth/login.js');
const router = express.Router();


// token nélkül végezhető műveletek:

// bejelentkezés
router.post('/login', login);

// új vásárló regisztráció
router.post('/register', customerRegister); 

// minden termék lekérdezése
router.get('/products', getAllProducts);

// egy termék lekérdezése ID alapján
router.get('/product/:id', getOneProductById);


module.exports = router;
