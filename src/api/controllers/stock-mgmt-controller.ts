import { RequestHandler } from "express";
import stockMgmtService from "../services/stock-mgmt-service";

const getAllStocks: RequestHandler = async (req, res, next) => {
  const { pageSize, offSet } = req.body;
  try {
    const stocks = await stockMgmtService.getAllStocks(pageSize, offSet);
    res.json({ stocks: stocks });
  } catch (err) {
    next(err);
  }
};

const searchStock: RequestHandler = async (req, res, next) => {
  const searchOption = req.params.searchOption;
  try {
    const stock = await stockMgmtService.searchStock(searchOption);
    res.json({ stock: stock });
  } catch (err) {
    next(err);
  }
};


const getStockByTicker: RequestHandler = async (req, res, next) => {
  const stockTicker = req.params.stockTicker;
  try {
    const stock = await stockMgmtService.getStockByTicker(stockTicker);
    res.json({ stock: stock });
  } catch (err) {
    next(err);
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
    next(err);
  }
};

export default { getAllStocks, createStock, searchStock, getStockByTicker };
