
const express = require('express')
const app = express()
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // this line store the data in req.body



const personRoute = require('./routes/personRouter');
const menuRoute = require('./routes/menuRouter');

app.use('/person', personRoute);

app.use('/menu', menuRoute);


const port = process.env.PORT || 3000;
app.listen(port , () => {
  console.log('listening 3000')
})

