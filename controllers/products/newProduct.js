const multer = require('multer');
const path = require('path');
const Product = require('../../models/product');
const Joi = require('joi');


// Definiáljuk a validáló sémát
const productSchema = Joi.object({
  Name: Joi.string().required(),
  Model: Joi.string().required(),
  Color: Joi.string().allow(''),
  Quality: Joi.string().required(),
  BundsNumber: Joi.string().allow(''),
  Body: Joi.string().allow(''),
  Neck: Joi.string().allow(''),
  FretBoard: Joi.string().allow(''),
  Pickup: Joi.string().allow(''),
  Weight: Joi.number().default(0).min(0),
  ChannelsNumber: Joi.number().default(0).min(0),
  SpeakersNumber: Joi.number().default(0).min(0),
  Wattage: Joi.number().default(0).min(0),
  Width: Joi.number().default(0).min(0),
  Length: Joi.number().default(0).min(0),
  Thickness: Joi.number().default(0).min(0),
  CableLength: Joi.number().default(0).min(0),
  ConnectorType: Joi.string().allow(''),
  Radius: Joi.string().allow(''),
  CategoryName: Joi.string().required(),
  SubCategoryName: Joi.string().required(),
  BrandName: Joi.string().required(),
  Price: Joi.number().required().min(0),
  Description: Joi.string().required(),
  ProductPhotoURL: Joi.string().required(),
  OnSale: Joi.boolean().default(false),
  SalePrice: Joi.number().default(0).min(0),
  InStock: Joi.boolean().default(true),
});

// Állítsd be a multer-t
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../api/productsImg'));
  },
  filename: async (req, file, cb) => {
    try {
      // Megkeressük a legnagyobb ID-jű terméket
      const highestProduct = await Product.findOne().sort({ ProductID: -1 }).exec();
      const newProductID = highestProduct ? highestProduct.ProductID + 1 : 1;

      // Generáljuk az új fájlnevet
      // csak a kiterjesztést szedi ki a feltöltött névből, ha az egész név kell akkor a basename kell!!
      const fileExtension = path.extname(file.originalname);
      const newFileName = `${newProductID}${fileExtension}`;
      cb(null, newFileName);
    } catch (err) {
      cb(err);
    }
  }
});

const upload = multer({ storage });

// Az új termék feltöltési vezérlője
const newProduct = async (req, res) => {
  try {
    // Ellenőrizzük, hogy a fájl feltöltésre került-e
    if (!req.file) {
      return res.status(400).json({ message: 'Termékfotó feltöltése szükséges.' });
    }

    // Validáljuk a beérkező adatokat
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Új termék létrehozása a feltöltött fájl URL-jével
    const product = new Product({
      ...req.body,
      ProductID: parseInt(req.file.filename), // Az ID-t a fájlnévből vesszük
      ProductPhotoURL: `/api/productsImg/${req.file.filename}`
    });

    // Termék mentése az adatbázisba
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { upload, newProduct };
