const express = require('express');
const PizzaController = require('../controllers/pizzaController');

const router = express.Router();

router.get('/', [PizzaController.list]);

router.get('/:id', [PizzaController.findById]);

router.post('/', [PizzaController.insert]);

router.delete('/:id', [PizzaController.removeById]);

router.patch('/:id', [PizzaController.patchById]);

module.exports = router;