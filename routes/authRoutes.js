const express = require('express');
const login = require('../controllers/auth/login.js');
const authenticate = require('../middlewares/authenticate.js');
const authorizeAdmin = require('../middlewares/authorizeAdmin.js');
const authorizeCustomer = require('../middlewares/authorizeCustomer.js');
const adminRegister = require('../controllers/auth/adminRegister.js');
const customerRegister = require('../controllers/auth/customerRegister.js');
const getAllOrders = require('../controllers/order/getAllOrders.js');
const getOrderById = require('../controllers/order/getOrderById.js');
const createOrder = require('../controllers/order/createOrder.js');
const updateOrder = require('../controllers/order/updateOrder.js');
const deleteOrder = require('../controllers/order/deleteOrder.js');

const router = express.Router();




// bejelentkezés
router.post('/login', login);
// Vásárlói regisztráció
router.post('/register', customerRegister);

// Admin regisztáció
router.post('/adminregister', authenticate , authorizeAdmin, adminRegister);


// TODO : jogosultság kezelés authenticate, authorizeAdmin, !!!
router.get('/orders', getAllOrders),
router.get('/orders/:id', getOrderById);
router.post('/orders', createOrder);
router.put('/orders/:id', updateOrder);
router.delete('/orders/:id', deleteOrder);

module.exports = router;
