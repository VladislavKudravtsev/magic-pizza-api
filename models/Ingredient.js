const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

exports.Ingredient = mongoose.model('Ingredient', ingredientSchema);