const express = require('express');
const Leader = require('../models/Leader');
const { verifyToken, requireAdmin } = require('../middleware/auth');

const router = express.Router();

// GET all leaders (public — anyone logged in can view)
router.get('/', verifyToken, async (req, res) => {
  try {
    const leaders = await Leader.find().sort({ order: 1 });
    res.json(leaders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error fetching leaders' });
  }
});

// POST create a new leader (admin only)
router.post('/', verifyToken, requireAdmin, async (req, res) => {
  try {
    const leader = new Leader(req.body);
    await leader.save();
    res.status(201).json(leader);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error creating leader' });
  }
});

// PUT update a leader (admin only)
router.put('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const leader = await Leader.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' });
    }
    res.json(leader);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error updating leader' });
  }
});

// DELETE a leader (admin only)
router.delete('/:id', verifyToken, requireAdmin, async (req, res) => {
  try {
    const leader = await Leader.findByIdAndDelete(req.params.id);
    if (!leader) {
      return res.status(404).json({ message: 'Leader not found' });
    }
    res.json({ message: 'Leader removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error deleting leader' });
  }
});

module.exports = router;
