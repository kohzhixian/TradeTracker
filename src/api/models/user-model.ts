import { Schema, model, Document } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isDeleted: boolean;
  profileImage: string;
  secretCode: string;
}

export interface IUserModel extends IUser, Document {}

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true, //makes the email value lowercase
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, //email validation
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    profileImage: {
      type: String,
    },
    secretCode: {
      type: String,
    },
  },
  //Enable schmea validation
  { validateBeforeSave: true }
);

//allows mongoose to add unique validation
userSchema.plugin(uniqueValidator);

//avoid pluralization complexity
export default model<IUserModel>("User", userSchema, "User");
