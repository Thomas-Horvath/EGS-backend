
const User = require('../../models/users');

const adminRegister = async (req, res) => {
    try {
        const { UserName, Password, EmailAddress, FirstName, LastName, AdminRole, JobTitle } = req.body;

        // Lekérjük a jelenlegi legnagyobb UserID értéket
        const maxUserIdUser = await User.findOne().sort({ UserID: -1 }).exec();
        const newUserId = maxUserIdUser ? maxUserIdUser.UserID + 1 : 1;


        const newAdmin = new User({
            UserID : newUserId,
            UserName,
            Password,
            EmailAddress,
            FirstName,
            LastName,
            IsAdmin: "1",
            AdminRole,
            JobTitle,
            ActiveFlag: "1"
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin regisztráció sikeres!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = adminRegister;
