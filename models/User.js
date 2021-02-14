const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  permissionLevel: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('User', UserSchema);
