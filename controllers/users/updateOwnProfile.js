const User = require('../../models/users.js');
const bcrypt = require('bcrypt');
const userSchema = require('../../validationSchemas/userSchema');


const updateUserById = async (req, res) => {
    try {

        const id = req.user.id;
        const { ...updateData } = req.body;


        // Ellenőrizd, hogy van-e jelszó a frissítési adatokban
        if (updateData.Password) {
            // Hash-eld a jelszót
            const hashedPassword = await bcrypt.hash(updateData.Password, 10);
            updateData.Password = hashedPassword;
        }

        const { error } = userSchema.validate(updateData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const updatedUser = await User.findOneAndUpdate({ UserID: id }, updateData, { new: true });

        if (!updatedUser) {
            res.status(404).send([{ error: 'A felhasználó nem található!' }]);
        } else {
            res.status(201).json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateUserById;
