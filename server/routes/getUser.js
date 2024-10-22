// routes/getUser.js
const express = require('express');
const User = require('../models/userModels');
const router = express.Router();

router.get('/psychologists', async (req, res) => {
  try {
    const psychologists = await User.find({ role: 'psychiatrist' });
    console.log('Fetch was successful');
    res.json(psychologists);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

router.get('/psychologist/:username', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.params.username, role: 'psychiatrist' });
    if (!user) {
      console.log('Psychologist not found');
      return res.status(404).json({ msg: 'Psychologist not found' });
    }
    console.log('Psychologist found');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

router.delete('/psychologist/:username', async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ username: req.params.username});
    if (!result) {
      return res.status(404).json({ msg: 'Psychologist not found' });
    }
    // Optional: Delete related articles if needed
    // await Article.deleteMany({ author: req.params.username });
    res.json({ msg: 'Psychologist deleted successfully' });
  } catch (error) {
    console.error('Error deleting psychologist:', error);
    res.status(500).send(`Server error: ${error.message}`);
  }
});

module.exports = router;
