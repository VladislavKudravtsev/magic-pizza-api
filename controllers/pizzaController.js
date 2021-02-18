const Pizza = require("../models/Pizza");

exports.list = async (req, res, next) => {
  const limit = req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }

  try {
    const pizza = await Pizza.find()
      .skip(parseInt(limit * page))
      .limit(parseInt(limit))
      .populate("ingredients")
      .lean();
    res.locals.data = pizza;
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

exports.findById = async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.id)
      .populate("ingredients")
      .lean();
    res.locals.data = pizza;
    return next();
  } catch (error) {
    return res.status(400).json({ message: "pizza not found" });
  }
};

exports.insert = async (req, res) => {
  try {
    const pizza = new Pizza(req.body);
    await pizza.save();
    await Pizza.populate(pizza, { path: "ingredients" });
    res.status(201).json({
      data: pizza,
      message: "pizza saved",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.removeById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id).populate("ingredients");
    await pizza.deleteOne();
    res.status(200).json({
      data: pizza,
      message: "pizza removed",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.patchById = async (req, res) => {
  try {
    const pizza = await Pizza.findById(req.params.id);
    pizza.set(req.body);
    await pizza.save();
    await Pizza.populate(pizza, { path: "ingredients" });
    res.status(200).json({
      data: pizza,
      message: "pizza updated",
    });
  } catch (error) {
    res.status(400).json(error);
  }
};
