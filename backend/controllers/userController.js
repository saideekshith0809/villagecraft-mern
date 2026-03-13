const User = require('../models/User');

// @desc    Toggle like workshop
// @route   POST /api/users/like/:workshopId
// @access  Private
const toggleLikeWorkshop = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const workshopId = req.params.workshopId;
    const index = user.likedWorkshops.findIndex(item => item.toString() === workshopId);

    if (index > -1) {
      // Unlike
      user.likedWorkshops.splice(index, 1);
      await user.save();
      res.json({ message: 'Workshop unliked', liked: false, likedWorkshops: user.likedWorkshops });
    } else {
      // Like
      user.likedWorkshops.push(workshopId);
      await user.save();
      res.json({ message: 'Workshop liked', liked: true, likedWorkshops: user.likedWorkshops });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = {
  toggleLikeWorkshop
};
