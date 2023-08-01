import User from "../models/user-model";
import RefreshToken from "../models/refreshToken-model";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

dotenv.config({ path: ".env.dev" });

const getAllUsers = async (condition: string) => {
  if (condition) {
    return await User.find().select(condition).exec();
  }
  return await User.find().exec();
};

const getUserById = async (userId: string) => {
  let existingUser;
  existingUser = await User.findById(userId).select("-password");
  if (!existingUser || existingUser.isDeleted) {
    throw new Error("No user found with userId");
  } else {
    return existingUser;
  }
};

const login = async (email: string, password: string) => {
  const tokenPassword = String(process.env.tokenPassword);
  const refreshTokenPassword = String(process.env.refreshTokenPassword);

  const existingUser = await User.findOne({ email: email });

  if (!existingUser || existingUser.isDeleted) {
    throw new Error("User does not exist");
  }

  const isPasswordValid = await bcrypt.compare(password, existingUser.password);

  if (!isPasswordValid) {
    throw new Error("Wrong credentials, Please try again");
  }

  const tokenData = {
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
  };

  const accessToken = jwt.sign(tokenData, tokenPassword, { expiresIn: "1h" });
  if (!accessToken) {
    throw new Error("Failed to sign access token");
  }

  const refreshToken = jwt.sign(tokenData, refreshTokenPassword, {
    expiresIn: "7d",
  });

  if (!refreshToken) {
    throw new Error("Failed to sign refresh token");
  }

  const decodedRefreshToken = jwt.verify(
    refreshToken,
    refreshTokenPassword
  ) as JwtPayload;

  if (!decodedRefreshToken) {
    throw new Error("Failed to verify refresh token");
  }

  const userId = existingUser._id;
  const newRefreshToken = new RefreshToken({
    userId,
    token: refreshToken,
    created_at: decodedRefreshToken.iat,
    expires_at: decodedRefreshToken.exp,
  });

  const result = await newRefreshToken.save();
  if (!result) {
    throw new Error("Faield to create refresh token");
  }

  let profileImage = existingUser.profileImage;
  const tokenResponse = {
    ...tokenData,
    accessToken: accessToken,
    refresToken: refreshToken,
    profileImage: profileImage,
  };

  return tokenResponse;
};

const register = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  profileImage: string,
  companyCode: string
) => {
  const existingUser = await User.findOne({ email: email });
  if (existingUser) {
    throw new Error("Email has alreay been used, Please try another email");
  }

  const hashPassword = await bcrypt.hash(password, 12);

  let isDeleted = false;

  if (profileImage == "") {
    profileImage = "default-image.jpg";
  }

  if (companyCode !== "ABC") {
    throw new Error("Invalid Company Code");
  }
  const createUser = new User({
    email,
    firstName,
    lastName,
    password: hashPassword,
    isDeleted,
    profileImage,
    companyCode,
  });

  const result = await createUser.save();
  if (!result) {
    throw new Error("Failed to create user");
  }
};

const updateProfile = async (
  userId: string,
  firstName: string,
  lastName: string,
  email: string
) => {
  const existingUser = await User.findById(userId);

  if (!existingUser || existingUser.isDeleted) {
    throw new Error("No user found");
  }

  existingUser.firstName = firstName;
  existingUser.lastName = lastName;
  existingUser.email = email;

  const result = await existingUser.save();

  if (!result) {
    throw new Error("Failed to update Profile");
  }
};

const updatePassword = async (
  userId: string,
  currentPassword: string,
  newPassword: string
) => {
  const existingUser = await User.findOne({ _id: userId });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const isCurrentPassword = await bcrypt.compare(
    currentPassword,
    existingUser.password
  );

  if (!isCurrentPassword) {
    throw new Error("Current Password is wrong");
  }

  let hashedNewPassword = await bcrypt.hash(newPassword, 12);
  existingUser.password = hashedNewPassword;

  const result = await existingUser.save();
  if (!result) {
    throw new Error("Failed to save new password");
  }
};

const deactivateAccount = async (userId: string) => {
  const existingUser = await User.findById(userId);

  if (!existingUser) {
    throw new Error("No user to delete");
  }

  existingUser.isDeleted = true;

  const result = await existingUser.save();

  if (!result) {
    throw new Error("Failed to delete user");
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
