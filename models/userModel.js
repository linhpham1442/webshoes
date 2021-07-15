const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Number,
        required: true
    },
    isDeleted: {
        type: Boolean,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now()
    }
})
let userModel = mongoose.model('user', userSchema);
module.exports = userModel;