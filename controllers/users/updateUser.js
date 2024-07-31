const bcrypt = require('bcrypt');
const User = require('../../models/users.js');

const updateUserById = async (req, res) => {
    try {
        const id = Number(req.params.id); 
        const updateData = { ...req.body }

        // Ellenőrizd, hogy van-e jelszó a frissítési adatokban
        if (updateData.Password) {
            // Hash-eld a jelszót
            const hashedPassword = await bcrypt.hash(updateData.Password, 10);
            updateData.Password = hashedPassword;
           
        }

        const updatedUser = await User.findOneAndUpdate({ UserID: id }, updateData, { new: true });

        if (!updatedUser) {
            res.status(404).send([{ error: 'A felhasználó nem található!' }]);
        } else {
            res.json(updatedUser);
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateUserById;
