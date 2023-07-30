import trademgmtSchema from "../models/trade-mgmt-model";
import stockmgmtSchema from "../models/stock-mgmt-model";
import { getFormattedDate, getFormattedNumber } from "../../utils/date-utils";
import { calculateEarnings } from "../../utils/trade-utils";

const createTrade = async (
  userId: string,
  stockId: string,
  volume: number,
  price_per_share: number,
  exit_price: number
) => {
  //Get Current Date in the format 'YYYMMDD'
  const currentDate = getFormattedDate();

  //Find the last trade entry in the database
  const lastTrade = await trademgmtSchema.findOne(
    { tradeId: { $regex: `^TXN${currentDate}` } },
    {},
    { sort: { tradeId: -1 } }
  );
  //If there are no trade entries, set sequenceNumber to 1
  let sequenceNumber = 1;

  // If there is a last trade entry, extract the sequence number from the tradeId
  if (lastTrade) {
    const lastTradeId = lastTrade.tradeId;
    sequenceNumber = parseInt(lastTradeId.slice(-4)) + 1;
  }

  // Format the sequence number to have 4 digits (e.g., 0001, 0012, 0123, 1234)
  const formattedSequenceNumber = getFormattedNumber(sequenceNumber);

  // Calculate earnings
  const result = calculateEarnings(volume, price_per_share, exit_price);
  const total_purchase = result.total_purchase;
  const total_sell_price = result.total_sell_price;
  const earnings = result.earnings;

  //Get entry date
  const entry_date = new Date();

  const tradeId = `TXN${currentDate}${formattedSequenceNumber}`;
  const newTrade = new trademgmtSchema({
    userId,
    stockId,
    tradeId,
    volume,
    price_per_share,
    exit_price,
    total_sell_price,
    earnings,
    total_purchase,
    entry_date,
    exit_date: null,
  });

  try {
    await newTrade.save();
  } catch (err) {
    console.error(err);
    throw new Error("Failed to create trade");
  }
};

const getAllTrades = async (pageSize: number, offSet: number) => {
  offSet = (offSet - 1) * 10;
  try {
    const trades = await trademgmtSchema
      .find()
      .limit(pageSize)
      .skip(offSet)
      .sort({})
      .exec();
    return trades;
  } catch (err) {
    throw new Error("No trades found");
  }
};

const updateTrade = async (tradeId: string, volume: number) => {
  let existingTrade;
  try {
    existingTrade = await trademgmtSchema.findOne({ _id: tradeId });
  } catch (err) {
    throw new Error("No Trade found");
  }

  if (!existingTrade) {
    throw new Error("No Trade found !!!");
  }

  existingTrade.volume = volume;
  const result = calculateEarnings(
    existingTrade.volume,
    existingTrade.price_per_share,
    existingTrade.exit_price
  );
  existingTrade.total_purchase = result.total_purchase;
  existingTrade.total_sell_price = result.total_sell_price;
  existingTrade.earnings = result.earnings;

  try {
    await existingTrade.save();
  } catch (err) {
    throw new Error("cannot update trade");
  }
};

const getTradeById = async (tradeId: string) => {
  try {
    const result = await trademgmtSchema.findOne({ _id: tradeId });
    return result;
  } catch (err) {
    throw new Error("Cannot find any trade !");
  }
};

const getTradeByTicker = async (ticker: string) => {
  let stock;
  ticker = ticker.toUpperCase();
  try {
    stock = await stockmgmtSchema.findOne({ ticker: ticker });
    if (!stock) {
      throw new Error("No stock found");
    }
    const trades = await trademgmtSchema.find({ stockId: stock._id });
    return trades;
  } catch (err) {
    throw new Error("Error finding trade");
  }
};

export default {
  createTrade,
  getAllTrades,
  updateTrade,
  getTradeById,
  getTradeByTicker,
};
