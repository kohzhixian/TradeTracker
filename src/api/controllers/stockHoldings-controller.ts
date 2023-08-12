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

const getAllTrade: RequestHandler = async (req, res, next) => {
  const {tradeId} = req.body;
  try {
    const result = await stockHoldingsService.getAllTrade(tradeId);
    res.json({ Trade: result });
  } catch (err) {
    throw new HttpError("Something went wrong, NO trades found", 500);
  }
};

export default {
  createTrade,
  getAllTrade
};
