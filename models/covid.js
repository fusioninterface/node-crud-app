const mongoose = require('mongoose');

const CovidSchema = new mongoose.Schema({
    country: {
        type: String,
        required: true
    },
    totalCases: {
        type: Number,
        required: true
    },
    recoveredCases: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Covid', CovidSchema);