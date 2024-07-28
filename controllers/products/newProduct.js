
const multer = require('multer');
const path = require('path');
const Product = require('../../models/product');

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
