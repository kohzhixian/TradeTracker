import stockMgmtSchema from "../models/stock-mgmt-model";

const getAllStocks = async (pageSize: number, offSet: number) => {
  offSet = (offSet - 1) * pageSize;
  try {
    const stocks = await stockMgmtSchema
      .find()
      .limit(pageSize)
      .skip(offSet)
      .select("-_id ticker name sector industry marketCap")
      .exec();
    return stocks;
  } catch (err) {
    throw new Error("No stocks found");
  }
};

// const getStockById = async (stockId: string) => {
//   try {
//     const stock = await stockMgmtSchema.findOne({ _id: stockId });
//     return stock;
//   } catch (err) {
//     throw new Error("No stock found");
//   }
// };

const searchStock = async (searchOption: string) => {
  try {
    const stockByName = await stockMgmtSchema.find({
      name: new RegExp(searchOption, "i"),
    });
    const stockByTicker = await stockMgmtSchema.find({
      ticker: new RegExp(searchOption, "i"),
    });

    const stocks = [...stockByName, ...stockByTicker];
    const uniqueStocks = stocks.filter(
      (item, index, array) =>
        array.findIndex((obj) => obj.name === item.name) === index
    );
    return uniqueStocks;
  } catch (err) {
    throw new Error("No stock found");
  }
};

// const getStockByName = async (stockName: string) => {
//   try {
//     const stock = await stockMgmtSchema.find({ name: stockName });
//     return stock;
//   } catch (err) {
//     throw new Error("No stock found with stock name");
//   }
// };

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

export default { getAllStocks, createStock, searchStock, getStockByTicker };
