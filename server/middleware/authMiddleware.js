const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

// Utility function to parse buffer to Base64
const parseBufferToBase64 = (buffer, mimeType) => {
  const raw = buffer.toString('base64');
  return `data:${mimeType};base64,${raw}`;
};

// Register
const register = async (req, res) => {
  const { username, email, password, role, description, testCode } = req.body;
  const profilePic = req.file;

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    if (role === 'psychiatrist') {
      if (!profilePic || profilePic.size === 0) {
        return res.status(400).json({ msg: 'Psychiatrists must provide a profile picture' });
      }
      if (!description) {
        return res.status(400).json({ msg: 'Psychiatrists must provide a description' });
      }
      if (testCode !== process.env.PSYCHIATRIST_TEST_CODE) {
        return res.status(400).json({ msg: 'Invalid test code' });
      }
    }

    const isApproved = role === 'psychiatrist' ? true : false;

    const hashedPassword = await bcrypt.hash(password, 10);

    const profilePicData = profilePic ? parseBufferToBase64(profilePic.buffer, profilePic.mimetype) : null;

    user = new User({
      username,
      email,
      password: hashedPassword,
      role,
      profilePic: profilePicData,
      isApproved,
      description
    });

    await user.save();

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Login
const login = async (req, res) => {
  const { email, username, password } = req.body;
  if (!username && !email) {
    return res.status(400).json({ msg: 'Email or username is required' });
  }

  try {
    let user;
    if (email) {
      user = await User.findOne({ email });
    } else if (username) {
      user = await User.findOne({ username });
    }

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );

  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

module.exports = { login, register };
