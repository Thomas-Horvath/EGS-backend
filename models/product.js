const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    ProductID: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Modell: { type: String, required: true },
    Color: { type: String, default: '' },
    Quality: { type: String, required: true },
    BundsNumber: { type: String, default: ''},
    Body: { type: String, default: '' },
    Neck: { type: String, default: '' },
    FretBoard: { type: String, default: '' },
    Pickup: { type: String, default: '' },
    Weight: { type: String, default: '' },
    ChanelsNumber: { type: String, default: '' },
    SpeakersNumber: { type: String, default: '' },
    Wattage: { type: String, default: '' },
    Widht: { type: String, default: '' },
    Lenght: { type: String, default: '' },
    Thickness: { type: String, default: '' },
    CableLenght: { type: String, default: '' },
    ConnectorType: { type: String, default: '' },
    Radius: { type: String, default: '' },
    CategoryName: { type: String, required: true },
    SubCategoryName: { type: String, required: true },
    BrandName: { type: String, required: true },
    Price: { type: Number, required: true },
    Description: { type: String, required: true },
    ProductPhotoURL: { type: String, required: true },
    OnSale: { type: Boolean, default: false },
    SalePrice: { type: Number, default: 0 },
    InStock: { type: Boolean, default: true },
}, { timestamps: true });


const product = mongoose.model('Product', productSchema);

module.exports = product;
