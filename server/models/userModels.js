const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'psychiatrist'],
    required: true
  },
  profilePic: {
    type: String, // Store the base64 image data as a string
  },
  description: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isApproved: {
    type: Boolean,
    default: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
