const User = require('../../models/users.js');


const updateUserById = async (req, res) => {
    try {
        const id = Number(req.params.id); 
        const { ...updateData } = req.body;

        const updatedUser = await User.findOneAndUpdate({ UserID: id }, updateData, { new: true });

        if (!updatedUser) {
            res.status(404).send([{ error: 'A felhasználó nem található!' }]);
        } else {
            res.json(updatedUser);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = updateUserById;
