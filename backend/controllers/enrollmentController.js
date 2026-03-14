const Enrollment = require('../models/Enrollment');
const Workshop = require('../models/Workshop');
const Notification = require('../models/Notification');
const User = require('../models/User');

const enrollInWorkshop = async (req, res) => {
  const { workshopId, studentName, phone, village, district, state, message } = req.body;
  
  if (!studentName || !phone) {
    return res.status(400).json({ message: 'Please provide all required fields (Name and Phone)' });
  }

  const email = req.user.email;

  try {
    const workshop = await Workshop.findById(workshopId).populate('trainer', 'name');
    if (!workshop) return res.status(404).json({ message: 'Workshop not found' });
    
    const trueEnrolledCount = await Enrollment.countDocuments({ workshop: workshopId });
    if (trueEnrolledCount >= workshop.maxParticipants) return res.status(400).json({ message: 'No seats available' });

    // Check duplicate
    const existing = await Enrollment.findOne({ workshop: workshopId, email });
    if (existing) return res.status(400).json({ message: 'You are already enrolled in this workshop' });

    const enrollment = await Enrollment.create({
      workshop: workshopId,
      studentName,
      email,
      phone,
      village,
      district,
      state,
      message
    });

    // Increase enrolled count
    workshop.enrolledCount += 1;
    await workshop.save();

    // Create Notifications
    // 1. To Student
    await Notification.create({
      recipient: req.user.id,
      type: 'enrollment',
      message: `Success! You're enrolled in ${workshop.title}.`,
      workshop: workshopId
    });

    // 2. To Trainer
    await Notification.create({
      recipient: workshop.trainer,
      sender: req.user.id,
      type: 'enrollment',
      message: `${studentName} just joined your workshop: ${workshop.title}.`,
      workshop: workshopId
    });

    // 3. To Admins (all users with role 'admin')
    const admins = await User.find({ role: 'admin' });
    const adminNotifications = admins.map(admin => ({
      recipient: admin._id,
      sender: req.user.id,
      type: 'enrollment',
      message: `${studentName} enrolled in ${workshop.title} (Trainer: ${workshop.trainerName || 'Staff'}).`,
      workshop: workshopId
    }));
    if (adminNotifications.length > 0) {
      await Notification.insertMany(adminNotifications);
    }

    res.status(201).json({ message: 'Enrollment successful!', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ email: req.user.email }).populate('workshop');
    // Extract just the workshop objects from enrollment records
    const workshops = enrollments
      .filter(e => e.workshop)
      .map(e => ({
        ...e.workshop.toObject(),
        enrollmentId: e._id,
        enrolledAt: e.createdAt
      }));
    res.json(workshops);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getEnrollmentsByWorkshop = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ workshop: req.params.workshopId }).populate('workshop', 'title');
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { enrollInWorkshop, getEnrollmentsByWorkshop, getMyEnrollments };
