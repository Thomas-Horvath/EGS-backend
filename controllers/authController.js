const jwt = require('jsonwebtoken');
const User = require('../models/users.js'); // A helyes útvonalat állítsd be a saját projektednek megfelelően




// Bejelentkezés és token generálás
const login = async (req, res) => {
    const { UserName, Password } = req.body;

    try {
        const user = await User.findOne({ UserName });
        if (!user || !(await user.comparePassword(Password))) {
            return res.status(401).json({ message: 'Hibás felhasználónév vagy jelszó' });
        }

        const token = jwt.sign(
            { id: user._id, UserName: user.UserName },
            process.env.JWT_SECRET, // Titkos kulcs a tokenekhez
            { expiresIn: '1h' } // Token lejárati idő
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Token ellenőrzése middleware-ben
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Nincs token' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Érvénytelen token' });
        }
        req.user = decoded;
        next();
    });
};

module.exports = { login, authenticate };
