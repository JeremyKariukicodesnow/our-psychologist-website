const mongoose = require('mongoose')

const ScheduleSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Schedule', ScheduleSchema)