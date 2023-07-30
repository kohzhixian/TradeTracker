import { RequestHandler } from "express";
import userService from "../services/user-service";

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers("-password");
    res.status(200).json({ users: users });
  } catch (err) {
    next(err);
  }
};

const getUserById: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
};

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const loginTokenData = await userService.login(email, password);
    res.json({ loginTokenData: loginTokenData });
  } catch (err) {
    next(err);
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
    next(err);
  }
};

const updateProfile: RequestHandler = async (req, res, next) => {
  const { userId, firstName, lastName, email } = req.body;
  try {
    await userService.updateProfile(userId, firstName, lastName, email);
    res.json({ Message: "Update successful" });
  } catch (err) {
    next(err);
  }
};

const updatePassword: RequestHandler = async (req, res, next) => {
  const { userId, currentPassword, newPassword } = req.body;
  try {
    await userService.updatePassword(userId, currentPassword, newPassword);
    res.json({ message: "update password successful" });
  } catch (err) {
    throw new Error("Failed to update password");
  }
};

const deactivateAccount: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await userService.deactivateAccount(userId);
    res.json({ Message: "Delete successful" });
  } catch (err) {
    next(err);
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
