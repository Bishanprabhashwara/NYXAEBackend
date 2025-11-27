const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
const { validateRegister, validateLogin } = require('../middleware/validation');

router.post('/register', validateRegister, userController.register);

router.post('/login', validateLogin, userController.login);

module.exports = router;
