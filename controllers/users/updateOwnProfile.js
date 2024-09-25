const User = require('../../models/users.js');
const bcrypt = require('bcrypt');
const userUpdateSchema = require('../../validationSchemas/userUpdateSchema');

const updateUserById = async (req, res) => {
    try {
        const id = req.user.id;
        const { Password, ...updateData } = req.body; // Az új jelszót külön kezeljük

        // Ellenőrizd, hogy van-e jelszó a frissítési adatokban
        if (Password) {
            // Hash-eld a jelszót
            const hashedPassword = await bcrypt.hash(Password, 10);
            updateData.Password = hashedPassword; // Az updateData-ban szereplő jelszót módosítjuk
        } else {
            // Ha nincs új jelszó, távolítsuk el a Password mezőt az updateData-ból
            delete updateData.Password;
        }

        // Validáljuk az updateData-t
        const { error } = userUpdateSchema.validate(updateData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        // Frissítjük az adatokat, ha van mit frissíteni
        const updatedUser = await User.findOneAndUpdate({ UserID: id }, updateData, { new: true });

        if (!updatedUser) {
            res.status(404).send([{ error: 'A felhasználó nem található!' }]);
        } else {
            res.status(200).json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateUserById;
