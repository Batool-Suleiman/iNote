const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: [true, 'This email is already used'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: 8
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);