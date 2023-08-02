import { Types } from "mongoose";

export interface logoutDTO {
    userId: Types.ObjectId | string;
}