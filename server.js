const express = require("express");
const fs = require("fs");
const path = require('path');
const dotenv = require("dotenv");
const connectDB = require('./config/db');
const allRoutes = require('./routes/allRoutes.js');


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


// az útvonalak a/api után érhetők el!
app.use('/api', allRoutes);

// Ha nem megfelelő az URL hibát küldünk vissza
app.get("*", (req, res) => {
  res.status(404).send({ status: 404 });
});



app.listen(PORT, () => {
  console.log(`A szerver a ${PORT} -on fut!`);
});