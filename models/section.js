const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const SectionSchema = new Schema({
    sem: {
        type: Number,
        required: true
    },
    branch: {
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
    teachersAbbr: {
        type: Object,
        required: true
    }
});

module.exports = mongoose.model('section', SectionSchema);