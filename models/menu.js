const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name:{type: String, required: true},
  price:{type: Number, required: true},
  taste:{type: String, required: true, enum:["spicy", "sweet", "sour", "salty"]},
  is_drink:{type: Boolean, default: false},
  ingrendiants:{type: [String], default: []},
  num_sale: {type: Number, default: 0}
});

const menu = mongoose.model('Menu', menuItemSchema);
module.exports = menu;