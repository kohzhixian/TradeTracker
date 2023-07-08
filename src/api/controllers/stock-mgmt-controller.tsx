// const stockMgmtService = require("../services/stock-mgmt-service");

// const getAllStocks = async (req, res, next) => {
//   try {
//     const stocks = await stockMgmtService.getAllStocks();
//     res.json({ stocks: stocks });
//   } catch (err) {
//     next(err);
//   }
// };

// const getStockByName = async (req, res, next) => {
//   const stockName = req.params.stockName;
//   try {
//     const stock = await stockMgmtService.getStockByName(stockName);
//     res.json({ stock: stock });
//   } catch (err) {
//     next(err);
//   }
// };

// const getStockBySymbol = async (req, res, next) => {
//   const stockSymbol = req.params.stockSymbol;
//   try {
//     const stock = await stockMgmtService.getStockBySymbol(stockSymbol);
//     res.json({ stock: stock });
//   } catch (err) {
//     next(err);
//   }
// };

// const createStock = async (req, res, next) => {
//   const {
//     ticker,
//     name,
//     sector,
//     industry,
//     currentPrice,
//     dailyHigh,
//     dailyLow,
//     volume,
//     averageVolume,
//     marketCap,
//     description,
//     country,
//   } = req.body;

//   try {
//     await stockMgmtService.createStock(
//       ticker,
//       name,
//       sector,
//       industry,
//       currentPrice,
//       dailyHigh,
//       dailyLow,
//       volume,
//       averageVolume,
//       marketCap,
//       description,
//       country
//     );
//     res.json({ message: "Stock created" });
//   } catch (err) {
//     next(err);
//   }
// };

// module.exports = {
//   getAllStocks,
//   getStockByName,
//   getStockBySymbol,
//   createStock,
// };
