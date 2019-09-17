const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('user', UserSchema);