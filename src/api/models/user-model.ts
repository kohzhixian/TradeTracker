// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
import { Schema, model, Document } from "mongoose";
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  isDeleted: string;
  profileImage: string;
}

export interface IUserModel extends IUser, Document {};

const userSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
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
      type: String,
      required: true,
    },
    profileImage: {
      type: String,
    },
    //Enable schmea validation
  },
  { validateBeforeSave: true }
);

//allows mongoose to add unique validation
userSchema.plugin(uniqueValidator);

//avoid pluralization complexity
// module.exports = mongoose.model("User", userSchema, "User");
export default model<IUserModel>('User', userSchema, 'User');
