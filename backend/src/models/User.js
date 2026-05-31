const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetOtp: {
    type: String,
    default: null,
  },

  resetOtpExpires: {
    type: Date,
    default: null,
  },

  signupOtp: {
    type: String,
    default: null,
  },

  signupOtpExpires: {
    type: Date,
    default: null,
  },

  isVerified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('User', userSchema);