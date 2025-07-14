// routes/companies.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

// Example company route
router.get('/profile', protect, roleMiddleware('employer'), (req, res) => {
  res.json({ message: 'Company profile info here 🏢' });
});

module.exports = router;
