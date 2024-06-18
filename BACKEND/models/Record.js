const mongoose = require('mongoose');

const RecordSchema = new mongoose.Schema({
    hostname: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    ttl: {
        type: Number,
        required: true
    },
    data: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Record', RecordSchema);
