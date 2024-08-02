const User = require('../../models/users');
const userSchema = require('../../validationSchemas/userSchema');


const adminRegister = async (req, res) => {
    try {
        const { UserName, Password, EmailAddress, BirthDate, FirstName, LastName, AdminRole, JobTitle, PhoneNumber, Postcode, City, Address } = req.body;

        // Lekérjük a jelenlegi legnagyobb UserID értéket
        const maxUserIdUser = await User.findOne().sort({ UserID: -1 }).exec();
        const newUserId = maxUserIdUser ? maxUserIdUser.UserID + 1 : 1;

        const newAdminData = {
            UserName,
            Password,
            EmailAddress,
            BirthDate,
            FirstName,
            LastName,
            IsAdmin: true,
            AdminRole,
            JobTitle,
            PhoneNumber,
            Postcode,
            City,
            Address,
            ActiveFlag: true
        }
        // Validáljuk a beérkező adatokat
        const { error } = userSchema.validate(newAdminData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const newAdmin = new User({
            ...newAdminData,
            UserID: newUserId,
        });

        await newAdmin.save();
        res.status(201).json({ message: 'Admin regisztráció sikeres!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = adminRegister;
