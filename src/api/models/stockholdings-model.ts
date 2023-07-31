import { Schema, model, Document, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from "./user-model";

export interface StockPurchaseTransaction {
  entryTransactionID: string;
  quantity: number;
  entryPrice: number;
  entryDate: Date;
}

export interface IStockHoldings {
  userId: Types.ObjectId | IUser;
  action: "Long" | "Short";
  ticker: string;
  stockOnHand: number;
  stockAveragePrice: number;
  purchaseTransaction: StockPurchaseTransaction[];
}

export interface AggregateResult {
  userId: Types.ObjectId | IUser;
  action: "Long" | "Short";
  ticker: string;
  stockOnHand: number;
  stockAveragePrice: number;
  entryTransactionID: string;
  quantity: number;
  entryPrice: number;
  entryDate: Date;
}

export interface IIStockHoldingsModel extends IStockHoldings, Document {}

const StockHoldingsSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    ticker: {
      type: String,
      required: true,
    },
    stockOnHand: {
      type: Number,
      required: true,
    },
    stockAveragePrice: {
      type: Number,
      required: true,
    },
    purchaseTransaction: [
      {
        entryTransactionID: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        entryPrice: {
          type: Number,
          required: true,
        },
        entryDate: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  { validateBeforeSave: true }
);
StockHoldingsSchema.plugin(uniqueValidator);

export default model<IIStockHoldingsModel>(
  "stockholdings",
  StockHoldingsSchema,
  "stockholdings"
);
