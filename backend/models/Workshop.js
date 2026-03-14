const mongoose = require('mongoose');

const workshopSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  trainerName: String,
  location: String,
  district: String,
  state: String,
  date: String,
  duration: String,
  skillLevel: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
  maxParticipants: Number,
  enrolledCount: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  description: String,
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  image: String,
  fee: { type: String, default: 'Free' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workshop', workshopSchema);
