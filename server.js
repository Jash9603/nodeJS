
const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // this line store the data in req.body



const personRoute = require('./routes/personRouter');
const menuRoute = require('./routes/menuRouter');

app.use('/person', personRoute);

app.use('/menu', menuRoute);



app.listen(3000 , () => {
  console.log('listening 3000')
})

