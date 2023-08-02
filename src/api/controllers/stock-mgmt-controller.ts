import { RequestHandler } from "express";
import stockMgmtService from "../services/stock-mgmt-service";
import { HttpError } from "../models/http-error";

const getAllStocks: RequestHandler = async (req, res, next) => {
  const { pageSize, offSet } = req.body;
  try {
    const stocks = await stockMgmtService.getAllStocks(pageSize, offSet);
    res.json({ stocks: stocks });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find stock",
      500
    );
    return next(error);
  }
};

const searchStock: RequestHandler = async (req, res, next) => {
  const searchOption = req.params.searchOption;
  try {
    const stock = await stockMgmtService.searchStock(searchOption);
    res.json({ stock: stock });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find stock",
      500
    );
    return next(error);
  }
};

const getStockByTicker: RequestHandler = async (req, res, next) => {
  const stockTicker = req.params.stockTicker;
  try {
    const stock = await stockMgmtService.getStockByTicker(stockTicker);
    res.json({ stock: stock });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find stock",
      500
    );
    return next(error);
  }
};

const createStock: RequestHandler = async (req, res, next) => {
  const {
    ticker,
    name,
    sector,
    industry,
    currentPrice,
    dailyHigh,
    dailyLow,
    volume,
    averageVolume,
    marketCap,
    description,
    country,
  } = req.body;

  try {
    await stockMgmtService.createStock(
      ticker,
      name,
      sector,
      industry,
      currentPrice,
      dailyHigh,
      dailyLow,
      volume,
      averageVolume,
      marketCap,
      description,
      country
    );
    res.json({ message: "Stock created" });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, failed to create stock",
      500
    );
    return next(error);
  }
};

export default { getAllStocks, createStock, searchStock, getStockByTicker };
