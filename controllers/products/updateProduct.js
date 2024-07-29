// const Product = require('../../models/product.js');
// const getFullUrl = require('../../utils/imgUrl.module.js');

// const updateProductById = async (req, res) => {
//     try {
//         const id = Number(req.params.id); // Megkapjuk a kérés URL-jében a termék ID-jét
//         const { ...updateData } = req.body; // Az update-hez szükséges adatok

//         const updatedProduct = await Product.findOneAndUpdate({ ProductID: id }, updateData, { new: true });

//         if (!updatedProduct) {
//             res.status(404).send([{ error: 'A termék nem található!' }]);
//         } else {
//             updatedProduct.ProductPhotoURL = getFullUrl(req, `${updatedProduct.ProductPhotoURL}`);
//             // res.json(updatedProduct);
//             res.send({ status: 200});
//         }
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

// module.exports = updateProductById;




const fs = require('fs');
const path = require('path');
const Product = require('../../models/product.js');
const multer = require('multer');

// Állítsd be a multer-t
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../api/productsImg'));
    },
    filename: (req, file, cb) => {
        const id = Number(req.params.id); // A termék ID-jét az URL-ből kapjuk meg
        const fileExtension = path.extname(file.originalname);
        const newFileName = `${id}${fileExtension}`;
        cb(null, newFileName);
        console.log(newFileName);
    }
});

const upload = multer({ storage }).single('productPhoto');

const updateProductById = async (req, res) => {
    upload(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ message: 'Kép feltöltési hiba.', error: err });
        }

        try {
            const id = Number(req.params.id); // Megkapjuk a kérés URL-jében a termék ID-jét
            const { ...updateData } = req.body; // Az update-hez szükséges adatok

            console.log(' 1 Update Data:', updateData); // Naplózzuk az update adatokat

            // Keressük meg a régi terméket, hogy hozzáférjünk a régi kép URL-jéhez
            const oldProduct = await Product.findOne({ ProductID: id });
            if (!oldProduct) {
                return res.status(404).send([{ error: 'A termék nem található!' }]);
            }

            // Ha új fájl van feltöltve
            if (req.file) {
                // Frissítjük a termék kép URL-jét
                updateData.ProductPhotoURL = `/api/productsImg/${req.file.filename}`;
            } else {
                // Ha nem töltöttünk fel új képet, megőrizzük a régit
                updateData.ProductPhotoURL = oldProduct.ProductPhotoURL;
            }

            // Frissítjük a terméket az adatbázisban
            const updatedProduct = await Product.findOneAndUpdate({ ProductID: id }, updateData, { new: true });

            if (!updatedProduct) {
                return res.status(404).send([{ error: 'A termék nem található!' }]);
            }

            res.json(updatedProduct);
        } catch (error) {
            console.error('Hiba történt a termék frissítése során:', error); // Naplózzuk a hibát
            res.status(500).json({ message: error.message });
        }
    });
};

module.exports = updateProductById;

