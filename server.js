const express = require("express");
const fs = require("fs");
const path = require('path');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes.js');
const getAllOrders = require('./controllers/order/getAllOrders.js');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// Szükséges a cors, hogy külső oldalról is lehessen kéréseket küldeni az oldalra!
const cors = require("cors");
app.use(cors());



// Képeket szolgáltatjuk statikus fájlként
app.use('/api/productsImg', express.static(path.join(__dirname, 'api/productsImg')));
 
// Adatbázis kapcsolat léteítése
connectDB();




// Middleware - body-parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// a /products al útvonalainak beállítása a productRouts-ból
app.use('/products', productRoutes);
app.use('/user', authRoutes);

// Ha nem megfelelő az URL hibát küldünk vissza
app.get("*", (req, res) => {
    res.send(`<h1 style="text-align:center; padding:3rem; ">A keresett oldal nem található!</h1>`);
});



app.listen(PORT, () => {
  console.log(`A szerver a ${PORT} -on fut!`);
});