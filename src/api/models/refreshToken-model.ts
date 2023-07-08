import { Schema, model, Document, Types } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import { IUser } from "./user-model";

export interface IRefreshToken {
  userId: Types.ObjectId | IUser;
  token: string;
  created_at: number;
  expires_at: number;
}

export interface IRefreshTokenModel extends IRefreshToken, Document {}

const refreshTokenSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
    created_at: {
      type: Number,
      required: true,
    },
    expires_at: {
      type: Number,
      required: true,
    },
  },
  { validateBeforeSave: true }
);

refreshTokenSchema.plugin(uniqueValidator);

export default model<IRefreshTokenModel>('refreshtokens', refreshTokenSchema, 'refreshtokens');
