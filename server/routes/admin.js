const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Example admin route
router.get('/dashboard', protect, roleMiddleware('admin'), (req, res) => {
  res.json({ message: 'Welcome to the Admin Dashboard 🚀' });
});

module.exports = router;
