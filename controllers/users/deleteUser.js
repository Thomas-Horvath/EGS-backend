const User = require('../../models/users.js');

const deleteUser = async (req, res) => {
    try {
        const id = Number(req.params.id); // Megkapjuk a kérés URL-jében a termék ID-jét

        const deletedUser = await User.findOneAndDelete({ UserID: id });

        if (!deletedUser) {
            res.status(404).send([{ error: 'A felhasználó nem található!' }]);
        } else {
            res.json({ message: 'A felhasználó sikeresen törölve!', deletedUser });
        }
    } catch (error) {
        res.status(500).json({ hiba : error.message });
    }
};

module.exports = deleteUser;
