const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Workshop = require('../models/Workshop');
const Enrollment = require('../models/Enrollment');
const { protect, authorize } = require('../middleware/authMiddleware');

// Admin Stats
router.get('/admin', protect, authorize('admin'), async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const activeWorkshops = await Workshop.countDocuments({ status: 'approved' });
    const verifiedTrainers = await User.countDocuments({ role: 'trainer' });
    const pendingApprovals = await Workshop.countDocuments({ status: 'pending' });

    res.json({
      totalUsers,
      activeWorkshops,
      verifiedTrainers,
      pendingApprovals
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Student Stats
router.get('/student', protect, authorize('student'), async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const enrolled = await Enrollment.countDocuments({ email: user.email });
    
    // For now, completed, certificates, and saved are mock variables that start at 0 
    // since those features aren't fully modeled in the DB yet, but they will be real variables.
    res.json({
      enrolled,
      completed: 0,
      certificates: 0,
      saved: 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Trainer Stats
router.get('/trainer', protect, authorize('trainer'), async (req, res) => {
  try {
    const workshops = await Workshop.find({ trainer: req.user.id });
    const workshopIds = workshops.map(w => w._id);
    
    const totalStudents = await Enrollment.countDocuments({ workshop: { $in: workshopIds } });
    const activeWorkshops = workshops.filter(w => w.status === 'approved').length;

    res.json({
      totalStudents,
      activeWorkshops,
      rating: "0.0", // Will be calculated from reviews later
      earnings: 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Public Landing Page Stats
router.get('/public', async (req, res) => {
  try {
    const artisans = await User.countDocuments({ role: 'trainer' });
    const activeWorkshops = await Workshop.countDocuments({ status: 'approved' });
    const students = await User.countDocuments({ role: 'student' });
    
    res.json({
      artisans: artisans || 0,
      workshops: activeWorkshops || 0,
      villages: 12, // Distinct villages could be calculated, hardcoding starting point for demo
      students: students || 0
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
