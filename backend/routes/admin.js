const express = require('express');
const User = require('../models/User');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET all users pending approval
router.get('/pending-users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const pendingUsers = await User.find({ isApproved: false }).select('-password');
    res.json(pendingUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching pending users' });
  }
});

// GET all users (for admin directory/management)
router.get('/all-users', verifyToken, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
});

// PUT approve a user by ID
router.put('/approve/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isApproved = true;
    await user.save();

    res.json({ message: `${user.fullName} has been approved` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error approving user' });
  }
});

module.exports = router;
