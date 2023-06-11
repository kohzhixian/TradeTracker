const trademgmtSchema = require('../models/trade-mgmt-model');

const getAllTrades = async () => {
    try{
        const trades = await trademgmtSchema.find();
        return trades;
    }catch(err){
        throw new Error('No trades found');
    }
}

const getTradeByTradeId = async (tradeId) => {
    try{
        const trades = await trademgmtSchema.findOne({_id: tradeId});
        return trades;
    }catch(err){
        throw new Error('No trades found');
    }
}

const getTradeByUserId = async (userId) => {
    try{
        const trades = await trademgmtSchema.find({userId: userId});
        return trades;
    }catch(err){
        throw new Error('No trades found');
    }
}

const updateTrade = async (userId, tradeId, volume) => {
    try{
        const trade = await trademgmtSchema.find();
    }catch(err){
        throw new Error('Cannot update trade');
    }
}

module.exports = {
    getAllTrades,
    getTradeByTradeId,
    getTradeByUserId,
    updateTrade
}