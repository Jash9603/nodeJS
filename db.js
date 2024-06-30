const mongoose = require('mongoose');
require('dotenv').config();
//const mongoURL = 'mongodb://localhost:27017/hotels';


const mongoURL = process.env.DB_URL;

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('connected', () => {
  console.log('connection established');
});

db.on('error', (err) => {
  console.log('connection error: ' + err);
});

db.on('disconnected', () => {
  console.log('connection disconnected');
});

db.on('reconnected', () => {
  console.log('connection reconnected');
});



mongoose.set('debug', true);

module.exports = db;
