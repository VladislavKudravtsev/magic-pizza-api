const express = require('express');
const OrderController = require('../controllers/orderController');

const router = express.Router();

router.get('/', [OrderController.list]);

router.get('/:id', [OrderController.findById]);

router.post('/', [OrderController.insert]);

router.delete('/:id', [OrderController.removeById]);

router.patch('/:id', [OrderController.patchById]);

module.exports = router;