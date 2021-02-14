const mongoose = require('mongoose');

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  ingredients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Ingredient',
  }],
  price: {
    type: Map,
    of: mongoose.SchemaTypes.Mixed,
    required: true,
  },
});

module.exports = mongoose.model('Pizza', PizzaSchema);
