const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    UserID: { type: Number, required: true, unique: true },
    UserName: { type: String, required: true },
    Password: { type: String, required: true },  
    IsAdmin: { type: Boolean, default: false },  
    AdminRole: { type: String, default: '' },
    JobTitle: { type: String, default: '' },
    BirthDate: { type: String, default: '' },  
    LastName: { type: String, default: '' },
    FirstName: { type: String, default: '' },
    EmailAddress: { type: String, required: true, unique: true },
    PhoneNumber: { type: String, default: '' },
    Postcode: { type: String, default: '' },
    City: { type: String, default: '' },
    Address: { type: String, default: '' },
    ShippingPostcode: { type: String, default: '' },
    ShippingCity: { type: String, default: '' },
    ShippingAddress: { type: String, default: '' },
    InvoicePostcode: { type: String, default: '' },
    InvoiceCity: { type: String, default: '' },
    InvoiceAddress: { type: String, default: '' },
    ActiveFlag: { type: String, default: '1' }  
}, { timestamps: true });  // Az időbélyegzés automatikusan hozzáadódik

// Hash-eljük a jelszót mentés előtt
userSchema.pre('save', async function (next) {
    if (!this.isModified('Password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
 
        this.Password = await bcrypt.hash(this.Password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Jelszó ellenőrzése
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.Password);
};
const User = mongoose.model('User', userSchema);

module.exports = User;
