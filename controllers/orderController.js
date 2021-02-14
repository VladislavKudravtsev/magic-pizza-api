const Order = require('../models/Order');

exports.list = async (req, res) => {
  const limit = req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }
  try {
    const orders = await Order
      .find()
      .limit(limit)
      .skip(limit * page)
      .lean();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.findById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).lean();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: 'Order not found' });
  }
};

exports.insert = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({
      data: order,
      message: 'Order saved',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.removeById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    await order.deleteOne();
    res.status(200).json({
      data: order,
      message: 'Order removed',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.patchById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    order.set(req.body);
    await order.save();
    res.status(200).json({
      data: order,
      message: 'Order updated',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};