const express = require('express');

const path = require('path');


const authenticate = require('../middlewares/authenticate.js');
const authorizeAdmin = require('../middlewares/authorizeAdmin.js');
const adminRegister = require('../controllers/auth/adminRegister.js');
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
const updateOwnProfile = require('../controllers/users/updateOwnProfile.js');
const { newProduct, upload } = require('../controllers/products/newProduct.js');
const updateProductById = require('../controllers/products/updateProduct.js');
const deleteProduct = require('../controllers/products/deleteProduct.js');
const getAllProducts = require('../controllers/products/getAllProducts.js');
const getOneProductById = require('../controllers/products/getOneProductById.js');
const customerRegister = require('../controllers/auth/customerRegister.js');
const login = require('../controllers/auth/login.js');
const getOwnOrders = require('../controllers/order/getOwnOrders.js');
const adminLogin = require('../controllers/auth/adminLogin.js');
const { addNewsletter } = require('../controllers/newsletter/subscribeNewsletter.js');
const { getNewsletters } = require('../controllers/newsletter/getNewsletters.js');
const { updateNewsletterStatus } = require('../controllers/newsletter/updateNewsletterStatus.js');
const { deleteNewsletter } = require('../controllers/newsletter/deleteNewsletter.js');
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


// newsletter

router.post('/newsletter', addNewsletter);


// tokenhez kötött műveletek:

// Vásárlói útvonal:
router.get('/profile', authenticate, getOwnProfile); // saját adatok lekérdezése
router.put('/profileupdate', authenticate, updateOwnProfile); // saját adatok frissítése
router.post('/order', authenticate, createOrder);
router.get('/ownorders', authenticate, getOwnOrders)
router.get('/order/:id', authenticate, getOrderById);


// Admin útvonal:
router.post('/adminlogin', adminLogin);

// új admin regisztrálása
router.post('/adminregister', authenticate, authorizeAdmin, adminRegister);


//rendelések kezelése
router.get('/orders', authenticate, authorizeAdmin, getAllOrders),
    router.put('/order/:id', authenticate, authorizeAdmin, updateOrder);
router.delete('/order/:id', authenticate, authorizeAdmin, deleteOrder);


//felhasználók kezelése
router.get('/user/:id', authenticate, authorizeAdmin, getOneUserById); //egy felhasználó (admin, vásárló) adatai lekérdezése
router.get('/users', authenticate, authorizeAdmin, getAllUsers); // össze felhasznló (admin, vásárló) lekérdezése
router.put('/user/:id', authenticate, authorizeAdmin, updateUser); // össze felhasznló (admin, vásárló) frissítése
router.delete('/user/:id', authenticate, authorizeAdmin, deleteUser); // Felhasználó törlése


//TODO  ezeket még dokumentálni kell!!
// termékek kezelése
router.post('/newproduct', authenticate, authorizeAdmin, upload.single('productPhoto'), newProduct);
router.put('/productupdate/:id', authenticate, authorizeAdmin, updateProductById);
router.delete('/product/:id', authenticate, authorizeAdmin, deleteProduct);


// newsletter
router.get('/newslettersAll',authenticate, authorizeAdmin, getNewsletters);
router.put('/newsletterUpdate',authenticate, authorizeAdmin, updateNewsletterStatus);
router.delete('/newsletterDelete',authenticate, authorizeAdmin, deleteNewsletter);


module.exports = router;
