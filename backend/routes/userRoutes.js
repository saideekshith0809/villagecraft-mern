const express = require('express');
const router = express.Router();
const { toggleLikeWorkshop } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/like/:workshopId', protect, toggleLikeWorkshop);

module.exports = router;
