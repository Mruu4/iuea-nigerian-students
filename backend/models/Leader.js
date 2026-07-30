const mongoose = require('mongoose');

const leaderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0, // controls display order (e.g. President = 0, VP = 1, etc.)
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Leader', leaderSchema);
