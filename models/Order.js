const mongoose = require('mongoose');
const date = require('date-and-time');

const deliveryTime = date.format(date.addMinutes(new Date(), 45), 'YYYY/MM/DD HH:mm');

const OrderSchema = new mongoose.Schema({
  cart: {
    type: mongoose.SchemaTypes.Mixed,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  house: {
    type: String,
    required: true,
  },
  apartment: {
    type: String,
    required: true,
  },
  floor: {
    type: String,
    required: true,
  },
  entrance: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ['Cash', 'Card(online)', 'Card(courier)'],
    required: true,
  },
  comment: {
    type: String,
  },
  date: {
    type: String,
    default: deliveryTime,
  },
});

module.exports = mongoose.model('Order', OrderSchema);