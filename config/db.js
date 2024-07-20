const mongoose = require('mongoose');

const connectDB = async () => {
  try {

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Sikeres csatlakozás a MongoDb szerverhez!');
  } catch (error) {
    console.error('Csatlakozási hiba a MongoDb szerverhez:', error);
    process.exit(1); 
  }
};

// Az adatbázis kapcsolat zárása ha kéne:

// const closeDBConnection = async () => {
//   try {
//     await mongoose.connection.close();
//     console.log('MongoDB kapcsolat bezárva!');
//   } catch (error) {
//     console.error('Hiba a MongoDB kapcsolat bezárásakor:', error);
//   }
// };


module.exports = connectDB;
