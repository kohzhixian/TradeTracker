import stockMgmtSchema from "../models/stock-mgmt-model";
import { HttpError } from "../models/http-error";
import { createStockDTO } from "../../interface/stockMgmt-interface";

const getAllStocks = async (pageSize: number, offSet: number) => {
  offSet = (offSet - 1) * pageSize;
  const stocks = await stockMgmtSchema
    .find()
    .limit(pageSize)
    .skip(offSet)
    .select("-_id ticker name sector industry marketCap")
    .exec();

  if (!stocks) {
    throw new HttpError("No stock found", 404);
  }
  return stocks;
};

const searchStock = async (searchOption: string) => {
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

  if (!uniqueStocks || stocks.length === 0) {
    throw new HttpError("No stocks found", 404);
  }
  return uniqueStocks;
};

const getStockByTicker = async (stockSymbol: string) => {
  stockSymbol = stockSymbol.toUpperCase();
  const stock = await stockMgmtSchema.find({ ticker: stockSymbol });
  if (!stock || stock.length === 0) {
    throw new HttpError("No stock found with ticker", 404);
  }
  return stock;
};

const createStock = async (createStockDTO: createStockDTO) => {
  const exisitngStock = await stockMgmtSchema.findOne({
    name: createStockDTO.name,
  });

  if (exisitngStock) {
    throw new HttpError("Stock already exists", 404);
  }

  const newStock = new stockMgmtSchema(createStockDTO);

  const result = await newStock.save();
  if (!result) {
    throw new HttpError("Failed to create new stock", 404);
  }
};

export default { getAllStocks, createStock, searchStock, getStockByTicker };
