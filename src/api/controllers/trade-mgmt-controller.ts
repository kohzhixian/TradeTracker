import { RequestHandler } from "express";
import trademgmtService from "../services/trade-mgmt-service";

const createTrade: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  const stockId = req.params.stockId;
  const {
    volume,
    price_per_share,
    exit_price,
    total_sell_price,
    earnings,
    total_purchase,
  } = req.body;
  try {
    await trademgmtService.createTrade(
      userId,
      stockId,
      volume,
      price_per_share,
      exit_price
    );
    res.json({ message: "trade created " });
  } catch (err) {
    next(err);
  }
};

const getAllTrades: RequestHandler = async (req, res, next) => {
  const { pageSize, offSet } = req.body;
  try {
    const trades = await trademgmtService.getAllTrades(pageSize, offSet);
    res.json({ trades: trades });
  } catch (err) {
    next(err);
  }
};

const updateTrade: RequestHandler = async (req, res, next) => {
  const tradeId = req.params.tradeId;
  const { volume } = req.body;
  try {
    await trademgmtService.updateTrade(tradeId, volume);
    res.json({ message: "Update Trade success" });
  } catch (err) {
    next(err);
  }
};

const getTradeById: RequestHandler = async (req, res, next) => {
  const tradeId = req.params.tradeId;
  try {
    const result = await trademgmtService.getTradeById(tradeId);
    res.json({ trade: result });
  } catch (err) {
    next(err);
  }
};

const getTradeByTicker: RequestHandler = async (req, res, next) => {
  const ticker = req.params.ticker;
  try {
    const result = await trademgmtService.getTradeByTicker(ticker);
    res.json({ trades: result });
  } catch (err) {
    throw new Error("No trade found");
  }
};

export default {
  createTrade,
  getAllTrades,
  updateTrade,
  getTradeById,
  getTradeByTicker
};
