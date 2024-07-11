const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth')


const bodyParser = require('body-parser');

app.use(bodyParser.json()); // this line stores the data in req.body

const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request Made to : ${req.originalUrl}`);
  next(); // Move on to the next phase
};

app.use(logRequest);



app.use(passport.initialize());

app.get('/', (req, res) => {
  res.send('Welcome to our Hotel');
});

const personRoute = require('./routes/personRouter');
const menuRoute = require('./routes/menuRouter');

// Middleware to handle authentication



app.use('/person', personRoute);
app.use('/menu', passport.authenticate('local', { session: false }), menuRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
