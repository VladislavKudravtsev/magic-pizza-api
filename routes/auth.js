const express = require('express');
const AuthMiddleware = require('../middlewares/authorizationMiddleware');

const router = express.Router();

router.post('/', [AuthMiddleware.isPasswordAndUserMatch, AuthMiddleware.login]);

module.exports = router;