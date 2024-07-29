const User = require('../../models/users.js');

const customerRegister = async (req, res) => {
    const { UserName, Password, EmailAddress, FirstName, LastName } = req.body;

    try {
        // Ellenőrizzük, hogy a felhasználónév vagy email már létezik-e
        const existingUser = await User.findOne({ $or: [{ UserName }, { EmailAddress }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Felhasználónév vagy email már létezik' });
        }

           // Lekérjük a jelenlegi legnagyobb UserID értéket
           const maxUserIdUser = await User.findOne().sort({ UserID: -1 }).exec();
           const newUserId = maxUserIdUser ? maxUserIdUser.UserID + 1 : 1;

        // Új felhasználó létrehozása és mentése
        const user = new User({ UserID : newUserId , UserName, Password, EmailAddress, FirstName, LastName, IsAdmin: false, ActivFlage: "1" });
        await user.save();

        res.status(201).json({ message: 'Sikeres regisztráció' });
    } catch (error) {
        res.status(500).json({ Hiba : error.message });
    }
};

module.exports = customerRegister;