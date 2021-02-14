const Ingredient = require('../models/Ingredient');

exports.list = async (req, res) => {
  const limit = req.query.limit <= 100 ? parseInt(req.query.limit) : 10;
  let page = 0;
  if (req.query.page) {
    req.query.page = parseInt(req.query.page);
    page = Number.isInteger(req.query.page) ? req.query.page : 0;
  }
  try {
    const ingredients = await Ingredient
      .find()
      .limit(limit)
      .skip(limit * page)
      .lean();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.findById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id).lean();
    res.status(200).json(ingredient);
  } catch (error) {
    res.status(400).json({ message: 'Ingredient not found' });
  }
};

exports.insert = async (req, res) => {
  try {
    const ingredient = new Ingredient(req.body);
    await ingredient.save();
    res.status(201).json({
      data: ingredient,
      message: 'ingredient saved',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.removeById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    await ingredient.deleteOne();
    res.status(200).json({
      data: ingredient,
      message: 'ingredient removed',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.patchById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    ingredient.set(req.body);
    await ingredient.save();
    res.status(200).json({
      data: ingredient,
      message: 'ingredient updated',
    });
  } catch (error) {
    res.status(400).json(error);
  }
};