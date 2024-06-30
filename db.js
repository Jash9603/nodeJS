const mongoose = require('mongoose');
require('dotenv').config();

const mongoURL = process.env.DB_URL;

const connectionOptions = {
  tls: true,
  tlsInsecure: false  // Ensure this is set to false for production
};

const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(mongoURL, connectionOptions)
    .then(() => {
      console.log('MongoDB is connected');
    })
    .catch(err => {
      console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
      setTimeout(connectWithRetry, 5000);  // Retry after 5 seconds
    });
};

connectWithRetry();

const db = mongoose.connection;

db.on('connected', () => {
  console.log('MongoDB connection established');
});

db.on('error', (err) => {
  console.error('MongoDB connection error: ' + err);
});

db.on('disconnected', () => {
  console.log('MongoDB connection disconnected');
});

db.on('reconnected', () => {
  console.log('MongoDB connection reconnected');
});

mongoose.set('debug', true);

module.exports = db;
