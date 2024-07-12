const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModels');

// Register
const register = async (req, res) => {
  const { username, email, password, role, description, isApproved: approvedFromBody } = req.body;
  const profilePic = req.file; // file upload handled by multer

  try {
    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // If the role is psychiatrist, ensure they have a non-default profile picture and are approved
    if (role === 'psychiatrist') {
      if (!profilePic || profilePic.size === 0) {
        console.log(`profile pic required for psychologist`)
        return res.status(400).json({ msg: 'Psychiatrists must provide a profile picture' });
      }
      if (!description) {
        console.log(`description required for psychologist`)
        return res.status(400).json({ msg: 'Psychiatrists must provide a description' });
      }
      if (!approvedFromBody) {
        console.log('psychologist has to be approved')
        return res.status(400).json({ msg: 'Psychiatrists must be approved to register' });
      }
    }

    // Set isApproved to false if the role is user
    const isApproved = role === 'psychiatrist' ? approvedFromBody : false;

    // Encrypt the password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (hashError) {
      return res.status(500).send('Server error');
    }

    // Create new user object with hashed password
    user = new User({
      username,
      email,
      password: hashedPassword, // Store hashed password in the database
      role,
      profilePic:  profilePic ? profilePic.buffer.toString('base64') : null,
      isApproved,
      description
    });
    
    console.log(user)
    await user.save();

    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
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
    con
    // Create payload for JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
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

module.exports = { login, register };
