"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user-model"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config({ path: ".env.dev" });
const getAllUsers = (condition) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (condition) {
            return yield user_model_1.default.find().select(condition).exec();
        }
        return yield user_model_1.default.find().exec();
    }
    catch (err) {
        throw new Error("Could not retrieve users");
    }
});
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser;
    try {
        existingUser = yield user_model_1.default.findById(userId).select("-password");
        if (!existingUser || existingUser.isDeleted === "Yes") {
            throw new Error("No user found with userId");
        }
        else {
            return existingUser;
        }
    }
    catch (err) {
        throw new Error("No user found with userId");
    }
});
const login = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenPassword = String(process.env.tokenPassword);
    let existingUser;
    try {
        existingUser = yield user_model_1.default.findOne({ email: email });
    }
    catch (err) {
        throw new Error("Login failed, Please try again");
    }
    if (!existingUser || existingUser.isDeleted === "Yes") {
        throw new Error("User does not exist");
    }
    let isPasswordValid;
    try {
        isPasswordValid = yield bcrypt_1.default.compare(password, existingUser.password);
    }
    catch (err) {
        throw new Error("Wrong credentials, Please try again");
    }
    if (!isPasswordValid) {
        throw new Error("Wrong credentials, Please try again");
    }
    const tokenData = {
        name: existingUser.firstName + existingUser.lastName,
        email: existingUser.email,
    };
    let token;
    try {
        token = jsonwebtoken_1.default.sign(tokenData, tokenPassword, { expiresIn: "1h" });
    }
    catch (err) {
        throw new Error("Token creation failed");
    }
    // let decodedToken;
    // try {
    //   decodedToken = jwt.verify(token, tokenPassword);
    // } catch (err) {
    //   throw new Error("Failed to verify token");
    // }
    // let userId = existingUser._id;
    // const newRefreshToken = new refreshtokenSchema({
    //   userId,
    //   token,
    //   created_at: decodedToken.iat,
    //   expires_at: decodedToken.exp,
    // });
    // try {
    //   await newRefreshToken.save();
    // } catch (err) {
    //   throw new Error("Failed to save token");
    // }
    const tokenResponse = Object.assign(Object.assign({}, tokenData), { token: token });
    return tokenResponse;
});
const createUser = (email, firstName, lastName, password) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenPassword = process.env.tokenPassword;
    let existingUser;
    try {
        existingUser = yield user_model_1.default.findOne({ email: email });
    }
    catch (err) {
        throw new Error("Failed to create user");
    }
    if (existingUser) {
        throw new Error("Email has alreay been used, Please try another email");
    }
    let hashPassword;
    try {
        hashPassword = yield bcrypt_1.default.hash(password, 12);
    }
    catch (err) {
        throw new Error("Could not create user");
    }
    let isDeleted = "No";
    const createUser = new user_model_1.default({
        email,
        firstName,
        lastName,
        password: hashPassword,
        isDeleted,
    });
    try {
        yield createUser.save();
    }
    catch (err) {
        throw new Error("Failed to create user");
    }
    // const tokenData = {
    //   name: createUser.firstName + createUser.lastName,
    //   email: createUser.email,
    // };
    // let token;
    // try {
    //   token = jwt.sign(tokenData, tokenPassword, { expiresIn: "1h" });
    // } catch (err) {
    //   throw new Error("Token creation failed");
    // }
    // const tokenResponse = {
    //   ...tokenData,
    //   token: token
    // }
    // return tokenResponse;
});
const updateUser = (userId, username, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser;
    try {
        existingUser = yield user_model_1.default.findById(userId);
    }
    catch (err) {
        throw new Error("No user found");
    }
    if (!existingUser || existingUser.isDeleted === 'Yes') {
        throw new Error("No user found");
    }
    let hashPassword;
    try {
        hashPassword = yield bcrypt_1.default.hash(password, 12);
    }
    catch (err) {
        throw new Error("Hashing of password failed");
    }
    existingUser.email = email;
    existingUser.password = hashPassword;
    try {
        yield existingUser.save();
    }
    catch (err) {
        throw new Error("Update User failed");
    }
});
const deleteUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    let existingUser;
    try {
        existingUser = yield user_model_1.default.findById(userId);
    }
    catch (err) {
        throw new Error("Delete User failed!");
    }
    if (!existingUser) {
        throw new Error("No user to delete");
    }
    existingUser.isDeleted = "Yes";
    try {
        yield existingUser.save();
    }
    catch (err) {
        throw new Error("Failed to update isDeleted");
    }
});
exports.default = { getAllUsers, getUserById, login, createUser, updateUser, deleteUser };
