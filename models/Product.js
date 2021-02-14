const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
    min: 0,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  image_url: {
    type: String,
    default: '',
  },
  weight: {
    type: Number,
    min: 0,
  },
  quantity: {
    type: Number,
    min: 1,
  },
});

module.exports = mongoose.model('Product', ProductSchema);