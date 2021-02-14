const express = require('express');
const IngredientController = require('../controllers/ingredientController');

const router = express.Router();

router.get('/', [IngredientController.list]);

router.get('/:id', [IngredientController.findById]);

router.post('/', [IngredientController.insert]);

router.patch('/:id', [IngredientController.patchById]);

router.delete('/:id', [IngredientController.removeById]);

module.exports = router;