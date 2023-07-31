import stockHoldingsSchema, {
  AggregateResult,
  IStockHoldingsModel,
  StockPurchaseTransaction,
} from "../models/stockholdings-model";
import { getFormattedDate, getFormattedNumber } from "../../utils/date-utils";
import mongoose from "mongoose";

const createTrade = async (
  userId: string,
  action: string,
  ticker: string,
  quantity: number,
  entryPrice: number
) => {
  //Find Existing Stock Holdings
  let stockHoldings;
  try {
    stockHoldings = await stockHoldingsSchema.findOne({
      userId: userId,
      ticker: ticker,
    });
  } catch (err) {
    throw new Error("Cannot find stock with given userId/ticker");
  }
  //Get Current Date in the format 'YYYMMDD'
  const entryDate = new Date();
  const currentEntryDate = getFormattedDate(entryDate);
  const stockOnHand = 123; // calculate stockOnHand
  const stockAveragePrice = 234; // calculate stockAveragePrice

  //Find the last trade entry in the database
  const lastStockPurchaseTransaction: AggregateResult[] =
    await stockHoldingsSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$purchaseTransaction",
      },
      {
        $match: {
          "purchaseTransaction.entryTransactionID": {
            $regex: new RegExp(`^TXN${currentEntryDate}`),
          },
        },
      },
      {
        $sort: {
          "purchaseTransaction.entryDate": -1,
        },
      },
      {
        $project: {
          userId,
          action,
          ticker,
          stockOnHand,
          stockAveragePrice,
          entryTransactionID: "$purchaseTransaction.entryTransactionID",
          quantity: "$purchaseTransaction.quantity",
          entryPrice: "$purchaseTransaction.entryPrice",
          entryDate: "$purchaseTransaction.entryDate",
        },
      },
    ]);

  //If there are no trade entries, set sequenceNumber to 1
  let entrySequenceNumber: number;

  // If there is a last trade entry, extract the sequence number from the tradeId
  if (
    !lastStockPurchaseTransaction ||
    lastStockPurchaseTransaction.length === 0
  ) {
    entrySequenceNumber = 1;
  } else {
    const lastEntryTradeId = lastStockPurchaseTransaction[0].entryTransactionID;
    entrySequenceNumber = parseInt(lastEntryTradeId.slice(-4)) + 1;
  }
  // Format the sequence number to have 4 digits (e.g., 0001, 0012, 0123, 1234)
  const formattedEntrySequenceNumber = getFormattedNumber(entrySequenceNumber);

  //Check Transaction Type
  const entryTransactionID = `TXN${currentEntryDate}${formattedEntrySequenceNumber}`;
  const newStockPurchaseTransaction: StockPurchaseTransaction = {
    entryTransactionID,
    quantity,
    entryPrice,
    entryDate,
  };

  //Create new Trade
  const tickerExist = (await stockHoldingsSchema.findOne({
    ticker: ticker,
  })) as IStockHoldingsModel;
  if (tickerExist) {
    tickerExist.purchaseTransaction.push(newStockPurchaseTransaction);
    await tickerExist.save();
  } else {
    const newStockHoldings = new stockHoldingsSchema({
      userId,
      action,
      ticker,
      stockOnHand,
      stockAveragePrice,
      purchaseTransaction: newStockPurchaseTransaction,
    });
    await newStockHoldings.save();
  }
};

// const getAllTrades = async (pageSize: number, offSet: number) => {
//   offSet = (offSet - 1) * 10;
//   try {
//     const trades = await trademgmtSchema
//       .find()
//       .limit(pageSize)
//       .skip(offSet)
//       .sort({})
//       .exec();
//     return trades;
//   } catch (err) {
//     throw new Error("No trades found");
//   }
// };

// const updateTrade = async (tradeId: string, volume: number) => {
//   // let existingTrade;
//   // try {
//   //   existingTrade = await trademgmtSchema.findOne({ _id: tradeId });
//   // } catch (err) {
//   //   throw new Error("No Trade found");
//   // }
//   // if (!existingTrade) {
//   //   throw new Error("No Trade found !!!");
//   // }
//   // existingTrade.volume = volume;
//   // const result = calculateEarnings(
//   //   existingTrade.volume,
//   //   existingTrade.price_per_share,
//   //   existingTrade.exit_price
//   // );
//   // existingTrade.total_purchase = result.total_purchase;
//   // existingTrade.total_sell_price = result.total_sell_price;
//   // existingTrade.earnings = result.earnings;
//   // try {
//   //   await existingTrade.save();
//   // } catch (err) {
//   //   throw new Error("cannot update trade");
//   // }
// };

// const getTradeById = async (tradeId: string) => {
//   try {
//     const result = await trademgmtSchema.findOne({ _id: tradeId });
//     return result;
//   } catch (err) {
//     throw new Error("Cannot find any trade !");
//   }
// };

// const getTradeByTicker = async (ticker: string) => {
//   let stock;
//   ticker = ticker.toUpperCase();
//   try {
//     stock = await stockmgmtSchema.findOne({ ticker: ticker });
//     if (!stock) {
//       throw new Error("No stock found");
//     }
//     const trades = await trademgmtSchema.find({ stockId: stock._id });
//     return trades;
//   } catch (err) {
//     throw new Error("Error finding trade");
//   }
// };

export default {
  createTrade,
  // getAllTrades,
  // updateTrade,
  // getTradeById,
  // getTradeByTicker,
};

