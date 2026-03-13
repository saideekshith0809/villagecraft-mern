const express = require('express');
const router = express.Router();
const { enrollInWorkshop, getEnrollmentsByWorkshop, getMyEnrollments } = require('../controllers/enrollmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', enrollInWorkshop);
router.get('/my-workshops', protect, getMyEnrollments);
router.get('/workshop/:workshopId', getEnrollmentsByWorkshop);

module.exports = router;
