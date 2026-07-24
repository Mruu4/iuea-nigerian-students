const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    registrationNumber: {
      type: String,
      trim: true,
    },
    faculty: {
      type: String,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    semester: {
      type: String,
      trim: true,
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
    },
    instagram: {
      type: String,
      trim: true,
    },
    profilePicture: {
      type: String, // will store a URL or file path
      default: '',
    },
    role: {
      type: String,
      enum: ['admin', 'leader', 'member'],
      default: 'member',
    },
    isApproved: {
      type: Boolean,
      default: false, // admin must approve before login access
    },
    graduationStatus: {
      type: String,
      enum: ['ongoing', 'graduated'],
      default: 'ongoing',
    },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
);

module.exports = mongoose.model('User', userSchema);
