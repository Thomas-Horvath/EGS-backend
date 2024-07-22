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
const getOneUserById = require('../controllers/users/getOneUserById.js');
const getAllUsers = require('../controllers/users/getAllUsers.js');
const updateUser = require('../controllers/users/updateUser.js');
const deleteUser = require('../controllers/users/deleteUser.js')
const getOwnProfile = require('../controllers/users/getOwnProfile.js');
const updateOwnProfile = require('../controllers/users/updateOwnProfile.js')
const router = express.Router();


//TODO átszervezni a product útvonalakat és törölni a /auth/ részt 

// token nélkül végezhető műveletek, bejelentkezés előtt
// bejelentkezés
router.post('/login', login);
// új vásárló regisztráció
router.post('/register', customerRegister); // új vásárló létrehozása




// Vásárlói útvonal
router.get('/profile', authenticate ,  getOwnProfile ); // saját adatok lekérdezése
router.put('/profileupdate', authenticate ,  updateOwnProfile); // saját adatok frissítése
router.post('/order' , authenticate , createOrder);





// Admin útvonal

router.post('/adminregister', authenticate , authorizeAdmin, adminRegister); // új admin regisztrálása


//rendelések kezelése
router.get('/orders',authenticate , authorizeAdmin, getAllOrders),
router.get('/orders/:id', authenticate , authorizeAdmin, getOrderById);
router.put('/orders/:id', authenticate , authorizeAdmin, updateOrder);
router.delete('/orders/:id', authenticate , authorizeAdmin, deleteOrder);

//felhasználók kezelése
router.get('/user/:id', authenticate , authorizeAdmin, getOneUserById ); //egy felhasználó (admin, vásárló) adatai lekérdezése
router.get('/users', authenticate , authorizeAdmin, getAllUsers ); // össze felhasznló (admin, vásárló) lekérdezése
router.put('/user/:id', authenticate , authorizeAdmin, updateUser); // össze felhasznló (admin, vásárló) frissítése
router.delete('/user/:id', authenticate , authorizeAdmin, deleteUser ); // Felhasználó törlése

module.exports = router;
