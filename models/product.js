const mongoose = require('mongoose');




const productSchema = new mongoose.Schema({
    ProductID: { type: Number, required: true, unique: true },
    Name: { type: String, required: true },
    Model: { type: String, required: true },
    Color: { type: String, default: '' },
    Quality: { type: String, required: true },
    BundsNumber: { type: String, default: '' },
    Body: { type: String, default: '' },
    Neck: { type: String, default: '' },
    FretBoard: { type: String, default: '' },
    Pickup: { type: String, default: '' },
    Weight: { type: Number, default: 0, min: 0},
    ChannelsNumber: { type: Number, default: 0, min: 0 }, 
    SpeakersNumber: { type: Number, default: 0, min: 0},
    Wattage: { type: Number, default: 0, min: 0},
    Width: { type: Number, default: 0, min: 0}, 
    Length: { type: Number, default: 0, min: 0}, 
    Thickness: { type: Number, default: 0, min: 0},
    CableLength: { type: Number, default: 0, min: 0 }, 
    ConnectorType: { type: String, default: '' },
    Radius: { type: String, default: '' },
    CategoryName: { type: String, required: true },
    SubCategoryName: { type: String, required: true },
    BrandName: { type: String, required: true },
    Price: { type: Number, required: true, min: 0 },
    Description: { type: String, required: true },
    ProductPhotoURL: { type: String, required: true },
    OnSale: { type: Boolean, default: false },
    SalePrice: { type: Number, default: 0, min: 0},
    InStock: { type: Boolean, default: true },
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
