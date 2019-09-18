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
    password: {
        type: String,
        required: true
    },
    section: {
        type: Object,
        required: false
    }
});

module.exports = mongoose.model('user', UserSchema);