import { RequestHandler } from "express";
import userService from "../services/user-service";
import { HttpError } from "../models/http-error";

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers("-password");
    res.status(200).json({ users: users });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find any user",
      500
    );
    return next(error);
  }
};

const getUserById: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json({ user: user });
  } catch (err) {
    const error = new HttpError("Something went wrong, could find user", 500);
    return next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const loginTokenData = await userService.login(email, password);
    res.json({ loginTokenData: loginTokenData });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Failed to login",
      500
    );
    return next(error);
  }
};

const register: RequestHandler = async (req, res, next) => {
  const { email, firstName, lastName, password, profileImage, companyCode } =
    req.body;
  try {
    const newUser = await userService.register(
      email,
      firstName,
      lastName,
      password,
      profileImage,
      companyCode
    );
    res.status(201).json({ message: "User created" });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Failed to register",
      500
    );
    return next(error);
  }
};

const updateProfile: RequestHandler = async (req, res, next) => {
  const { userId, firstName, lastName, email } = req.body;
  try {
    await userService.updateProfile(userId, firstName, lastName, email);
    res.json({ Message: "Update successful" });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Failed to update profile",
      500
    );
    return next(error);
  }
};

const updatePassword: RequestHandler = async (req, res, next) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    await userService.updatePassword(userId, currentPassword, newPassword);
    res.json({ message: "update password successful" });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Failed to update password",
      500
    );
    return next(error);
  }
};

const deactivateAccount: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await userService.deactivateAccount(userId);
    res.json({ Message: "Delete successful" });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, Failed to delete account",
      500
    );
    return next(error);
  }
};

export default {
  getAllUsers,
  getUserById,
  login,
  register,
  updateProfile,
  updatePassword,
  deactivateAccount,
};
