import { Schema, model, Document, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from "./user-model";
import { IStocks } from "./stock-mgmt-model";

export interface ITrades {
  userId: Types.ObjectId | IUser;
  stockId: Types.ObjectId | IStocks;
  tradeId: string;
  volume: number;
  price_per_share: number;
  total_purchase: number;
  exit_price: number;
  total_sell_price: number;
  earnings: number;
  entry_date: Date;
  exit_date: Date|null;
}

export interface ITradesMgmtModel extends ITrades, Document {}

const TradesMgmtSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    stockId: {
      type: Types.ObjectId,
      ref: "Stockmanagement",
      required: true,
    },
    tradeId: {
      type: String,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    price_per_share: {
      type: Number,
      required: true,
    },
    total_purchase: {
      type: Number,
      required: true,
    },
    exit_price: {
      type: Number,
      required: true,
    },
    total_sell_price: {
      type: Number,
      required: true,
    },
    earnings: {
      type: Number,
      required: true,
    },
    entry_date: {
      type: Date,
      required: true
    },
    exit_date: {
      type: Date
    }
  },
  { validateBeforeSave: true }
);
TradesMgmtSchema.plugin(uniqueValidator);

export default model<ITradesMgmtModel>(
  "trademanagement",
  TradesMgmtSchema,
  "trademanagement"
);
