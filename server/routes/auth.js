const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.Signup);
router.post('/login', authController.Login);
router.get('/logout', authController.Logout);
router.get('/checkAuth', authController.checkAuth);

module.exports = router;