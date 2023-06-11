const trademgmtService = require('../services/trade-mgmt-service');

const getAllTrades = async (req, res, next) => {
    const trades = await trademgmtService.getAllTrades();
    res.json({trades: trades});
}

const getTradeByTradeId = async (req, res, next) => {
    const tradeId = req.params.tradeId;
    const trades = await trademgmtService.getTradeByTradeId(tradeId);
    res.json({trades: trades});
}

const getTradeByUserId = async (req, res, next) => {
    const userId = req.params.userId;
    const trades = await trademgmtService.getTradeByUserId(userId);
    res.json({trades: trades});
}

const updateTrade = async (req, res, next) => {

}

module.exports = {
    getAllTrades,
    getTradeByTradeId,
    getTradeByUserId,
    updateTrade
}