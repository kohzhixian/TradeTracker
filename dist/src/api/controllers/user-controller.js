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
const user_service_1 = __importDefault(require("../services/user-service"));
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_service_1.default.getAllUsers("-password");
        res.status(200).json({ users: users });
    }
    catch (err) {
        next(err);
    }
});
const getUserById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        const user = yield user_service_1.default.getUserById(userId);
        res.status(200).json({ user: user });
    }
    catch (err) {
        next(err);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const loginTokenData = yield user_service_1.default.login(email, password);
        res.json({ loginTokenData: loginTokenData });
    }
    catch (err) {
        next(err);
    }
});
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, firstName, lastName, password } = req.body;
    try {
        const newUser = yield user_service_1.default.createUser(email, firstName, lastName, password);
        res.status(201).json({ message: 'User created' });
    }
    catch (err) {
        next(err);
    }
});
const updateUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    const { username, email, password } = req.body;
    try {
        yield user_service_1.default.updateUser(userId, username, email, password);
        res.json({ Message: "Update successful" });
    }
    catch (err) {
        next(err);
    }
});
const deleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.userId;
    try {
        yield user_service_1.default.deleteUser(userId);
        res.json({ Message: "Delete successful" });
    }
    catch (err) {
        next(err);
    }
});
exports.default = { getAllUsers, getUserById, login, createUser, updateUser, deleteUser };
