// const trademgmtService = require("../services/trade-mgmt-service");

// const getAllTrades = async (req, res, next) => {
//   try {
//     const trades = await trademgmtService.getAllTrades();
//     res.json({ trades: trades });
//   } catch (err) {
//     next(err);
//   }
// };

// const getTradeByTradeId = async (req, res, next) => {
//   const tradeId = req.params.tradeId;
//   try {
//     const trades = await trademgmtService.getTradeByTradeId(tradeId);
//     res.json({ trades: trades });
//   } catch (err) {
//     next(err);
//   }
// };

// const getTradeByUserId = async (req, res, next) => {
//   const userId = req.params.userId;
//   try {
//     const trades = await trademgmtService.getTradeByUserId(userId);
//     res.json({ trades: trades });
//   } catch (err) {
//     next(err);
//   }
// };

// const updateTrade = async (req, res, next) => {
//   const tradeId = req.params.tradeId;
//   const { volume } = req.body;
//   try {
//     await trademgmtService.updateTrade(tradeId, volume);
//     res.json({ message: "Update Trade success" });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   getAllTrades,
//   getTradeByTradeId,
//   getTradeByUserId,
//   updateTrade,
// };
