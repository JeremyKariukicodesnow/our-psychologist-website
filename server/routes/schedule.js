const express = require('express');
const router = express.Router();
const Schedule = require('../models/Schedule');
const nodemailer = require('nodemailer')

// To schedule an appointment
router.post('/schedule', async (req, res) => {
    const { date, time, email } = req.body;
    console.log('Requested body', req.body);

    if (!date || !time || !email) {
        return res.status(400).json({ message: 'Please fill in all fields.' });
    }

    try {
        const newAppointment = new Schedule({ date, time, email });
        await newAppointment.save();
        res.status(201).json(newAppointment);
    } catch (error) {
        console.error('Error scheduling appointment:', error);
        res.status(500).json({ message: 'There was an error scheduling the appointment. Please try again later.' });
    }
});

// Get all appointments
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Schedule.find();
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'There was an error fetching appointments. Please try again later.' });
    }
});

module.exports = router;
