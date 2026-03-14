const express = require('express');
const router = express.Router();
const { enrollInWorkshop, getEnrollmentsByWorkshop, getMyEnrollments } = require('../controllers/enrollmentController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.post('/', protect, authorize('student'), enrollInWorkshop);
router.get('/my-workshops', protect, getMyEnrollments);
router.get('/workshop/:workshopId', getEnrollmentsByWorkshop);

module.exports = router;
