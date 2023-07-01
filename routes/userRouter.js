const router = require('express').Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Register user
router.post('/register', userController.registerUser);

// Login user
router.post('/login', userController.loginUser);

// Verify token
router.get('/verify', userController.verifiedToken);

module.exports = router;