const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    year: {
        type: Number,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    sectionNumber: {
        type: Number,
        required: true
    },
    timetable: {
        type: Object,
        required: false
    },
    notifications: {
        type: Array,
        required: true
    },
});

module.exports = mongoose.model('section', SectionSchema);