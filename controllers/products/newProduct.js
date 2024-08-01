const multer = require('multer');
const path = require('path');
const Product = require('../../models/product');
const productSchema = require('../../validationSchemas/productSchema');


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
    const productData = {
      ...req.body,
      ProductPhotoURL: `/api/productsImg/${req.file.filename}`
    };



    // Validáljuk a beérkező adatokat
    const { error } = productSchema.validate(productData);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Új termék létrehozása a feltöltött fájl URL-jével
    const product = new Product({
      ...productData,
      ProductID: parseInt(req.file.filename), // Az ID-t a fájlnévből vesszük
    });

    // Termék mentése az adatbázisba
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { upload, newProduct };
