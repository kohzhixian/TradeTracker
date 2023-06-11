const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const stockMgmtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    stock_symbol: {
        type: String,
        required: true
    },
    volume: {
        type: Number,
        required: true
    }
},{uniqueValidator: true});

stockMgmtSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Stockmanagement', stockMgmtSchema, 'Stockmanagement');