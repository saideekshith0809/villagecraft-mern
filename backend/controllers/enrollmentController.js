const Enrollment = require('../models/Enrollment');
const Workshop = require('../models/Workshop');

const enrollInWorkshop = async (req, res) => {
  const { workshopId, studentName, email, phone, village, district, state, message } = req.body;
  try {
    const workshop = await Workshop.findById(workshopId);
    if (!workshop) return res.status(404).json({ message: 'Workshop not found' });
    if (workshop.availableSeats <= 0) return res.status(400).json({ message: 'No seats available' });

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

    // Decrease available seats
    workshop.availableSeats -= 1;
    await workshop.save();

    res.status(201).json({ message: 'Enrollment successful!', enrollment });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ email: req.user.email }).populate('workshop');
    // Extract just the workshop objects from enrollment records
    const workshops = enrollments.map(e => ({
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
