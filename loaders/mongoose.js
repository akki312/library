// mongoose.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('./logger');

dotenv.config();

const uri = process.env.MONGODB_CONNECTIONSTRING;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 30000,  // 30 seconds
      socketTimeoutMS: 45000    // 45 seconds
    });
    logger.info('MongoDB connected');
  } catch (err) {
    logger.error('MongoDB connection error:', err);
    process.exit(1);  // Exit process with failure
  }
};

mongoose.connection.on('error', (err) => {
  logger.error('Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  logger.warn('Mongoose disconnected');
});

module.exports = connectDB;
