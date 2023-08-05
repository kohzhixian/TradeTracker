import { Types } from "mongoose";
import { IUser } from "../api/models/user-model";

export interface salesTransactionDTO {
  userId: Types.ObjectId | IUser;
  action: "Long" | "Short";
  ticker: string;
  quantity: number;
  exitPrice: number;
}
