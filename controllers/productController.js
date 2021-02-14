const Product = require('../models/Product');

exports.list = async (req, res, next) => {
  const match = {};

  if (req.query.type) match.type = req.query.type;
  const limit = req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }

  try {
    const products = await Product
      .find(match)
      .limit(parseInt(limit))
      .skip(parseInt(limit * page))
      .lean();
    res.locals.data = products;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).lean();
    res.locals.data = product;
    return next();
  } catch (error) {
    return res.status(400).json({ message: 'product not found' });
  }
};

exports.insert = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json({
      data: product,
      message: 'product saved',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.removeById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.deleteOne();
    res.status(200).json({
      data: product,
      message: 'product removed',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.patchById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    product.set(req.body);
    await product.save();
    res.status(200).json({
      data: product,
      message: 'product updated',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};