"use strict";
// const stockMgmtSchema = require("../models/stock-mgmt-model");
// const getAllStocks = async () => {
//   try {
//     const stocks = await stockMgmtSchema.find();
//     return stocks;
//   } catch (err) {
//     throw new Error("No stocks found");
//   }
// };
// const getStockByName = async (stockName) => {
//   try {
//     const stock = await stockMgmtSchema.find({ name: stockName });
//     return stock;
//   } catch (err) {
//     throw new Error("No stock found with stock name");
//   }
// };
// const getStockBySymbol = async (stockSymbol) => {
//   stockSymbol = stockSymbol.toUpperCase();
//   try {
//     const stock = await stockMgmtSchema.find({ ticker: stockSymbol });
//     return stock;
//   } catch (err) {
//     throw new Error("No stock found with symbol");
//   }
// };
// const createStock = async (
//   ticker,
//   name,
//   sector,
//   industry,
//   currentPrice,
//   dailyHigh,
//   dailyLow,
//   volume,
//   averageVolume,
//   marketCap,
//   description,
//   country
// ) => {
//   let exisitngStock;
//   try {
//     exisitngStock = await stockMgmtSchema.findOne({ name: name });
//   } catch (err) {
//     throw new Error("Error creating stock");
//   }
//   if (exisitngStock) {
//     throw new Error("Stock already exists");
//   }
//   const newStock = new stockMgmtSchema({
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
//     country
//   });
//   try{
//     await newStock.save();
//   }catch(err){
//     throw new Error('Failed to create new stock');
//   }
// };
// module.exports = {
//   getAllStocks,
//   getStockByName,
//   getStockBySymbol,
//   createStock,
// };
