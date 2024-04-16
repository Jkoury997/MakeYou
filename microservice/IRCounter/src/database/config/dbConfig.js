const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    const uri = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
    try {
        await mongoose.connect(uri);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error('Could not connect to MongoDB:', err);
        throw err;  // Importante: lanza el error para que pueda ser capturado en el lugar donde se llama a connectDB.
    }
};

module.exports = connectDB;
