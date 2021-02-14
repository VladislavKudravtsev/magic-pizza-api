const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.get('/', [UserController.list]);

router.get('/:id', [UserController.findById]);

router.post('/', [UserController.insert]);

router.delete('/:id', [UserController.removeById]);

router.patch('/:id', [UserController.patchById]);

module.exports = router;