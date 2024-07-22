const jwt = require('jsonwebtoken');
const User = require('../../models/users.js'); // A helyes útvonalat állítsd be a saját projektednek megfelelően



// Bejelentkezés és token generálás
const login = async (req, res) => {
    const { UserName, Password } = req.body;

    try {
        const user = await User.findOne({ UserName });
        if (!user || !(await user.comparePassword(Password))) {
            return res.status(401).json({ message: 'Hibás felhasználónév vagy jelszó' });
        }

        const token = jwt.sign(
            { id: user._id, UserName: user.UserName, IsAdmin: user.IsAdmin},
            process.env.JWT_SECRET, // Titkos kulcs a tokenekhez
            { expiresIn: '1h' } // Token lejárati idő
        );

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = login;
