const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number, required: true
  },
  work:{
    type: String,
    enum: ['student', 'faculty', 'administrator'],
    required: true
  },
  mobile: {
    type: String, required: true,unique: true
  },
  email: {
    type: String, required: true, unique: true
  },
 address: {
  type: String, required: true
},
 salary: {
  type: Number, required: true
},
});


//create model
const person = mongoose.model('Person', personSchema);
module.exports = person;