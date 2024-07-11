const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
username:{
  type: String, require:true
},
password:{
  type: String, require:true
}
});


personSchema.methods.comparePassowrd = async function (candidatePassowrd){
  return await bcrypt.compare(candidatePassowrd, this.password);
}

personSchema.pre('save', async function (next) {
  const person = this;
  if(!person.isModified('password')) return next();
   try{
     const salt = await bcrypt.genSalt(10);
     const hash = await bcrypt.hash(person.password, salt);
     person.password = hash;
   }catch(err){
    
    
   }

  
})

//create model
const person = mongoose.model('Person', personSchema);
module.exports = person;

