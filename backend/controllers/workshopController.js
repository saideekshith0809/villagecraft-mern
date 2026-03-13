const Workshop = require('../models/Workshop');
const Enrollment = require('../models/Enrollment');

const getWorkshops = async (req, res) => {
  try {
    const workshops = await Workshop.find({ status: 'approved' }).lean();
    
    // Add enrolledCount to each workshop
    const workshopsWithCounts = await Promise.all(workshops.map(async (w) => {
      const enrolledCount = await Enrollment.countDocuments({ workshop: w._id });
      return { ...w, enrolledCount };
    }));

    res.json(workshopsWithCounts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getWorkshopById = async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id).lean();
    if (workshop) {
      const enrolledCount = await Enrollment.countDocuments({ workshop: workshop._id });
      res.json({ ...workshop, enrolledCount });
    } else {
      res.status(404).json({ message: 'Workshop not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const createWorkshop = async (req, res) => {
  try {
    const workshop = new Workshop({
      ...req.body,
      trainer: req.user.id,
      availableSeats: req.body.maxParticipants
    });
    const createdWorkshop = await workshop.save();
    res.status(201).json(createdWorkshop);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getWorkshops, getWorkshopById, createWorkshop };
