import { Schema, model, Document, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from "./user-model";

export interface IStockSalesTransaction {
  userId: Types.ObjectId | IUser;
  action: "Long" | "Short";
  ticker: string;
  exitTransactionID: string;
  quantity: number;
  exitPrice: number;
  exitDate: Date;
}

export interface IStockSalesTransactionModel
  extends IStockSalesTransaction,
    Document {}

const StockSalesTransactionSchema = new Schema(
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
    exitTransactionID: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    exitPrice: {
      type: Number,
      required: true,
    },
    exitDate: {
      type: Date,
      required: true,
    },
  },
  { validateBeforeSave: true }
);

StockSalesTransactionSchema.plugin(uniqueValidator);
export default model<IStockSalesTransactionModel>(
  "StockSalesTransaction",
  StockSalesTransactionSchema,
  "StockSalesTransaction"
);
