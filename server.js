const express = require("express");
const fs = require("fs");
const path = require('path');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const usersRoutes = require('./routes/usersRoutes');
const authRoutes = require('./routes/authRoutes');


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;


// szükséges cors, hogy külső oldalról is lehessen kéréseket küldeni az oldalra
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
//TODO ez majd megszűnik
app.use('/users', usersRoutes);

app.use('/user', authRoutes);

// Ha nem megfelelő az URL hibát küldünk vissza
app.get("*", (req, res) => {
    res.send(`<h1 style="text-align:center; padding:3rem; ">A keresett oldal nem található!</h1>`);
});



app.listen(PORT, () => {
  console.log(`A szerver a ${PORT} -on fut!`);
});