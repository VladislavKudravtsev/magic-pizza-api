const crypto = require('crypto');
const User = require('../models/User');

exports.list = async (req, res) => {
  const limit = req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }
  try {
    const users = await User
      .find()
      .limit(limit)
      .skip(limit * page)
      .lean();
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.findById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: 'User not found' });
  }
};

exports.insert = async (req, res) => {
  const salt = crypto.randomBytes(16).toString('base64');
  const hash = crypto.createHmac('sha512', salt)
    .update(req.body.password)
    .digest('base64');
  req.body.password = `${salt}$${hash}`;
  req.body.permissionLevel = 1;
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'User saved' });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.removeById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    await user.deleteOne();
    res.status(200).send({ message: 'User removed' });
  } catch (error) {
    res.send(400).send(error);
  }
};

exports.patchById = async (req, res) => {
  if (req.body.password) {
    const salt = crypto.randomBytes(16).toString('base64');
    const hash = crypto.createHmac('sha512', salt)
      .update(req.body.password)
      .digest('base64');
    req.body.password = `${salt}$${hash}`;
  }
  try {
    const user = await User.findById(req.params.id);
    user.set(req.body);
    await user.save();
    res.status(200).send({ message: 'User updated' });
  } catch (error) {
    res.status(400).send(error);
  }
};