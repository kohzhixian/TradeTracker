import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


export interface IStocks {
  ticker: string;
  name: string;
  sector: string;
  industry: string;
  currentPrice: number;
  dailyHigh: number;
  dailyLow: number;
  volume: number;
  averageVolume: number;
  marketCap: number;
  description: string;
  country: string;
}

export interface IStockMgmtModel extends IStocks, Document {}

const stockMgmtSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    sector: {
      type: String,
      required: true,
    },
    industry: {
      type: String,
      required: true,
    },
    currentPrice: {
      type: Number,
      required: true,
    },
    dailyHigh: {
      type: Number,
      required: true,
    },
    dailyLow: {
      type: Number,
      required: true,
    },
    volume: {
      type: Number,
      required: true,
    },
    averageVolume: {
      type: Number,
      required: true,
    },
    marketCap: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { validateBeforeSave: true }
);

stockMgmtSchema.plugin(uniqueValidator);

export default model<IStockMgmtModel>(
  "Stockmanagement",
  stockMgmtSchema,
  "Stockmanagement"
);
