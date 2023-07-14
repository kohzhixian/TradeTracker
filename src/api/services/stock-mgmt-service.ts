import stockMgmtSchema from "../models/stock-mgmt-model";

const getAllStocks = async () => {
  try {
    const stocks = await stockMgmtSchema.find();
    return stocks;
  } catch (err) {
    throw new Error("No stocks found");
  }
};

const getStockByName = async (stockName: string) => {
  try {
    const stock = await stockMgmtSchema.find({ name: stockName });
    return stock;
  } catch (err) {
    throw new Error("No stock found with stock name");
  }
};

const getStockByTicker = async (stockSymbol: string) => {
  stockSymbol = stockSymbol.toUpperCase();
  try {
    const stock = await stockMgmtSchema.find({ ticker: stockSymbol });
    return stock;
  } catch (err) {
    throw new Error("No stock found with symbol");
  }
};

const createStock = async (
  ticker: string,
  name: string,
  sector: string,
  industry: string,
  currentPrice: number,
  dailyHigh: number,
  dailyLow: number,
  volume: number,
  averageVolume: number,
  marketCap: number,
  description: string,
  country: string
) => {
  let exisitngStock;
  try {
    exisitngStock = await stockMgmtSchema.findOne({ name: name });
  } catch (err) {
    throw new Error("Error creating stock");
  }

  if (exisitngStock) {
    throw new Error("Stock already exists");
  }

  const newStock = new stockMgmtSchema({
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
  });

  try {
    await newStock.save();
  } catch (err) {
    throw new Error("Failed to create new stock");
  }
};

export default { getAllStocks, getStockByTicker, getStockByName, createStock };
