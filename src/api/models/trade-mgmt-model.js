const mongoose = require('mongoose');
const uniqueValiator = require('mongoose-unique-validator');

const trademgmtSchema = new mongoose.Schema({
    traderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stockId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stockmanagement',
        required: true
    },
    action: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    strategyId: {
        type: String,
        required: true
    },
    profitOrLoss: {
        type: Number,
        required: true
    }

},{uniqueValiator: true});

trademgmtSchema.plugin(uniqueValiator);

module.exports = mongoose.model('trademanagement', trademgmtSchema, 'trademanagement');