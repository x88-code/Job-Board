const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { body } = require('express-validator');

// ✅ Use full controller object to avoid circular require issues
const authController = require('../controllers/authController');
console.log('[DEBUG] authController.register is:', typeof authController.register);
console.log('[DEBUG] forgotPassword:', typeof authController.forgotPassword);
console.log('[DEBUG] resetPassword:', typeof authController.resetPassword);
console.log('[DEBUG] verifyEmail:', typeof authController.verifyEmail);
console.log('[DEBUG] protect:', typeof protect);

// Public routes
router.post('/register', [
  body('name').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], authController.register);

router.post('/login', [
  body('email').isEmail(),
  body('password').exists()
], authController.login);

router.post('/forgot-password', authController.forgotPassword);
router.put('/reset-password/:token', authController.resetPassword);
router.get('/verify-email/:token', authController.verifyEmail);

// Private routes
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);
router.put('/profile', protect, authController.updateProfile);
router.put('/change-password', protect, authController.changePassword);
router.post('/resend-verification', protect, authController.resendVerificationEmail);

module.exports = router;
