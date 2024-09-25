const jwt = require('jsonwebtoken');
const User = require('../../models/users.js'); 


// Bejelentkezés és token generálás
const login = async (req, res) => {
    const { UserName, Password } = req.body;

    try {
        const user = await User.findOne({ UserName });
        if (!user || !(await user.comparePassword(Password))) {
            return res.status(401).json({ message: 'Hibás felhasználónév vagy jelszó' });
        }
        if (!user.IsAdmin) {
            return res.status(403).json({ message: 'Csak adminisztrátorok jelentkezhetnek be!' });
        }

        const token = jwt.sign(
            { id: user.UserID, UserName: user.UserName, IsAdmin: user.IsAdmin, ActiveFlag: user.ActiveFlag },
            process.env.JWT_SECRET, // Titkos kulcs a tokenekhez a .env fájlból
            { expiresIn: '24h' } // Token lejárati idő
        );

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



module.exports = login;
