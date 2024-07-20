const express = require('express');
const { login, authenticate } = require('../controllers/authController.js'); // A helyes útvonalat állítsd be
const router = express.Router();

router.post('/login', login);

// Példa egy védett útvonal
router.get('/profil', authenticate, (req, res) => {
    res.send('Ez egy védett útvonal!');
});

module.exports = router;
