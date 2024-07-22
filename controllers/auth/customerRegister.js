const customerRegister = async (req, res) => {
    const { UserID, UserName, Password, EmailAddress, FirstName, LastName } = req.body;

    try {
        // Ellenőrizzük, hogy a felhasználónév vagy email már létezik-e
        const existingUser = await User.findOne({ $or: [{ UserName }, { EmailAddress }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Felhasználónév vagy email már létezik' });
        }

        // Új felhasználó létrehozása és mentése
        const user = new User({ UserID, UserName, Password, EmailAddress, FirstName, LastName, IsAdmin: "0", ActivFlage: "1" });
        await user.save();

        res.status(201).json({ message: 'Sikeres regisztráció' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = customerRegister;