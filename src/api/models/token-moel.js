const mongoose = require('mongoose');
const uniqueValiator = require('mongoose-unique-validator');

const tokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tokenData: {
        type: String,
        required: true
    }
}, {uniqueValiator: true});

tokenSchema.plugin(uniqueValiator);

module.exports = mongoose.model('token', tokenSchema, 'token');