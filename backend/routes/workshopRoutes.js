const express = require('express');
const { getWorkshops, getWorkshopById, createWorkshop } = require('../controllers/workshopController');
const { protect, authorize } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', getWorkshops);
router.get('/:id', getWorkshopById);
router.post('/', protect, authorize('trainer', 'admin'), createWorkshop);

module.exports = router;
