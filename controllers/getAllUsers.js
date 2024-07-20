const User = require('../models/users.js');
const getFullUrl = require('../utils/imgUrl.module.js');

const getAllProducts = async (req, res) => {
    try { const users = await User.find(); // lekérjük a felhasználókat
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = getAllProducts;
