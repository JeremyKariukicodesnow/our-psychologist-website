const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

// Register
const register = async (req, res) => {

  const { username, email, password, role, profilePic, isApproved: approvedFromBody } = req.body;

  try {
    let user = await User.findOne({ username });

    if (user) {
      console.log('User already exists');
      return res.status(400).json({ msg: 'User already exists' });
    }

    // If the role is psychiatrist, ensure they have a non-default profile picture and are approved
    if (role === 'psychiatrist') {
      if (!profilePic || profilePic === 'path/to/placeholder/image.jpg') {
        return res.status(400).json({ msg: 'Psychiatrists must provide a profile picture' });
      }
      if (!approvedFromBody) {
        return res.status(400).json({ msg: 'Psychiatrists must be approved to register' });
      }
    }

    // Set isApproved to false if the role is user
    const isApproved = role === 'psychiatrist' ? approvedFromBody : false;

    // Create new user object
    user = new User({
      username,
      email,
      password,
      role,
      profilePic,
      isApproved
    });

    // Encrypt the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Sign and return the JWT
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

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
        role: user.role
      }
    };

    // Sign and return the JWT
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

module.exports = {login , register}
