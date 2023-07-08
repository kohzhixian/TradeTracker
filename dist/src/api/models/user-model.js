"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const mongoose = require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
;
const userSchema = new mongoose_1.Schema({
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
}, { validateBeforeSave: true });
//allows mongoose to add unique validation
userSchema.plugin(mongoose_unique_validator_1.default);
//avoid pluralization complexity
// module.exports = mongoose.model("User", userSchema, "User");
exports.default = (0, mongoose_1.model)('User', userSchema, 'User');
