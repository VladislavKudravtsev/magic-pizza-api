const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

require('dotenv').config();

exports.isPasswordAndUserMatch = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name }).select('+password');
    if (!user) {
      return res.status(404).end();
    }
    const passwordFields = user.password.split('$');
    const salt = passwordFields[0];
    const hash = crypto.createHmac('sha512', salt)
      .update(req.body.password)
      .digest('base64');
    if (passwordFields[1] === hash) {
      req.body = {
        name: user.name,
        id: user._id,
        permissionLevel: user.permissionLevel,
      };
      return next();
    }
  } catch (error) {
    res.status(500).end();
    return next(error);
  }
  return res.status(400).send({ message: 'Invalid name or password' });
};

exports.login = async (req, res) => {
  try {
    const jwtSecret = process.env.jwt_secret;
    const token = jwt.sign(req.body, jwtSecret);
    res.status(201).send({ token });
  } catch (error) {
    res.status(500).send(error);
  }
};