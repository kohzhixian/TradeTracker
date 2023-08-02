import { RequestHandler } from "express";
import stockHoldingsService from "../services/stockHoldings-service";
import { HttpError } from "../models/http-error";
import { createTradeDTO } from "../../interface/stockHoldings-interface";

const createTrade: RequestHandler = async (req, res, next) => {
  try {
    await stockHoldingsService.createTrade(req.body as createTradeDTO);
    res.json({ message: "stockHoldings created" });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, failed to create stock holdings",
      500
    );
    return next(error);
  }
};

// const getAllTrades: RequestHandler = async (req, res, next) => {
//   const { pageSize, offSet } = req.body;
//   try {
//     const trades = await trademgmtService.getAllTrades(pageSize, offSet);
//     res.json({ trades: trades });
//   } catch (err) {
//     next(err);
//   }
// };

// const updateTrade: RequestHandler = async (req, res, next) => {
//   const tradeId = req.params.tradeId;
//   const { volume } = req.body;
//   try {
//     await trademgmtService.updateTrade(tradeId, volume);
//     res.json({ message: "Update Trade success" });
//   } catch (err) {
//     next(err);
//   }
// };

// const getTradeById: RequestHandler = async (req, res, next) => {
//   const tradeId = req.params.tradeId;
//   try {
//     const result = await trademgmtService.getTradeById(tradeId);
//     res.json({ trade: result });
//   } catch (err) {
//     next(err);
//   }
// };

// const getTradeByTicker: RequestHandler = async (req, res, next) => {
//   const ticker = req.params.ticker;
//   try {
//     const result = await trademgmtService.getTradeByTicker(ticker);
//     res.json({ trades: result });
//   } catch (err) {
//     throw new Error("No trade found");
//   }
// };

export default {
  createTrade,
  // getAllTrades,
  // updateTrade,
  // getTradeById,
  // getTradeByTicker,
};
