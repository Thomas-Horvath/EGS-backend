const User = require('../../models/users.js');
const userRegisterSchema = require('../../validationSchemas/userRegisterSchema');
const generateUniqueUserID = require('../../utils/generateUniqueUserID');


const customerRegister = async (req, res) => {
    const {
        UserName,
        Password,
        LastName,
        FirstName,
        EmailAddress,
        PhoneNumber,
        Postcode,
        City,
        Address,
        ShippingPostcode,
        ShippingCity,
        ShippingAddress,
        InvoicePostcode,
        InvoiceCity,
        InvoiceAddress,
    } = req.body;


    try {
        // Ellenőrizzük, hogy a felhasználónév vagy email már létezik-e
        const existingUser = await User.findOne({ $or: [{ UserName }, { EmailAddress }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Felhasználónév vagy email már létezik' });
        }
        const newUserId = await generateUniqueUserID();

        const newCustomerData = {
            UserName,
            Password,
            IsAdmin: false,
            LastName,
            FirstName,
            EmailAddress,
            PhoneNumber,
            Postcode,
            City,
            Address,
            ShippingPostcode,
            ShippingCity,
            ShippingAddress,
            InvoicePostcode,
            InvoiceCity,
            InvoiceAddress,
            ActiveFlag: true
        }

        console.log(newCustomerData)
        // Validáljuk a beérkező adatokat
        const { error } = userRegisterSchema.validate(newCustomerData);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }


        // Új felhasználó létrehozása és mentése
        const user = new User({
            ...newCustomerData,
            UserID: newUserId,
        });
        await user.save();

        res.status(201).json({ message: 'Sikeres regisztráció' });
    } catch (error) {
        res.status(500).json({ Hiba: error.message });
    }
};

module.exports = customerRegister;