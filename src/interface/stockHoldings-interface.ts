import { Types } from "mongoose";

export interface createTradeDTO {
  userId: Types.ObjectId | string;
  action: string;
  ticker: string;
  quantity: number;
  entryPrice: number;
}

export interface purchaseTransaction {
  entryTransactionID: string;
  quantity: number;
  entryPrice: number;
  entryDate: Date;
}
