import stockHoldingsSchema, {
  AggregateResult,
  IStockHoldingsModel,
  StockPurchaseTransaction,
} from "../models/stockholdings-model";
import { getFormattedDate, getFormattedNumber } from "../../utils/date-utils";
import mongoose from "mongoose";
import { createTradeDTO } from "../../interface/stockHoldings-interface";
import { calculateStockAveragePrice } from "../../utils/trade-utils";

const createTrade = async (createTradeDTO: createTradeDTO) => {
  //Get Current Date in the format 'YYYMMDD'
  const entryDate = new Date();
  const currentEntryDate = getFormattedDate(entryDate);
  //TODO: calculate stockOnHand
  const stockOnHand = 123;

  //TODO: alculate stockAveragePrice
  let stockAveragePrice: number = 0;
  let totalNumberOfStocks: number = 0;

  const userId = createTradeDTO.userId;
  const action = createTradeDTO.action;
  const ticker = createTradeDTO.ticker;
  const quantity = createTradeDTO.quantity;
  const entryPrice = createTradeDTO.entryPrice;

  //Find the last trade entry in the database
  const lastStockPurchaseTransaction: AggregateResult[] =
    await stockHoldingsSchema.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(createTradeDTO.userId),
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
  let totalStockPrice: number = 0;
  //Create new Trade
  const tickerExist = (await stockHoldingsSchema.findOne({
    ticker: ticker,
  })) as IStockHoldingsModel;
  if (tickerExist) {
    const result = calculateStockAveragePrice(
      totalStockPrice,
      totalNumberOfStocks,
      stockAveragePrice,
      createTradeDTO,
      tickerExist.purchaseTransaction
    );
    tickerExist.stockAveragePrice = result.stockAveragePrice;
    tickerExist.stockOnHand = result.totalNumberOfStocks;
    tickerExist.purchaseTransaction.push(newStockPurchaseTransaction);
    await tickerExist.save();
  } else {
    const newStockHoldings = new stockHoldingsSchema({
      userId,
      action,
      ticker,
      stockOnHand: createTradeDTO.quantity,
      stockAveragePrice: createTradeDTO.entryPrice,
      purchaseTransaction: newStockPurchaseTransaction,
    });
    await newStockHoldings.save();
  }
};

export default {
  createTrade,
};
