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

module.exports = connectDB;
