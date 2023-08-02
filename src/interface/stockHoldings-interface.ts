import { Types } from "mongoose";

export interface createTradeDTO {
  userId: Types.ObjectId | string;
  action: string;
  ticker: string;
  quantity: number;
  entryPrice: number;
}
