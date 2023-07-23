import User from "../models/user-model";
import RefreshToken from "../models/refreshToken-model";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

dotenv.config({ path: ".env.dev" });

const getAllUsers = async (condition: string) => {
  try {
    if (condition) {
      return await User.find().select(condition).exec();
    }
    return await User.find().exec();
  } catch (err) {
    throw new Error("Could not retrieve users");
  }
};

const getUserById = async (userId: string) => {
  let existingUser;
  try {
    existingUser = await User.findById(userId).select("-password");
    if (!existingUser || existingUser.isDeleted) {
      throw new Error("No user found with userId");
    } else {
      return existingUser;
    }
  } catch (err) {
    throw new Error("No user found with userId");
  }
};

const login = async (email: string, password: string) => {
  const tokenPassword = String(process.env.tokenPassword);
  const refreshTokenPassword = String(process.env.refreshTokenPassword);

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    throw new Error("Login failed, Please try again");
  }

  if (!existingUser || existingUser.isDeleted) {
    throw new Error("User does not exist");
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    throw new Error("Wrong credentials, Please try again");
  }

  if (!isPasswordValid) {
    throw new Error("Wrong credentials, Please try again");
  }

  const tokenData = {
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
  };
  let accessToken;
  try {
    accessToken = jwt.sign(tokenData, tokenPassword, { expiresIn: "1h" });
  } catch (err) {
    throw new Error("Token creation failed");
  }

  let refreshToken;
  try {
    refreshToken = jwt.sign(tokenData, refreshTokenPassword, {
      expiresIn: "7d",
    });
  } catch (err) {
    throw new Error("Token creation failed");
  }

  let decodedRefreshToken;
  try {
    decodedRefreshToken = jwt.verify(
      refreshToken,
      refreshTokenPassword
    ) as JwtPayload;
  } catch (err) {
    throw new Error("Failed to verify token");
  }

  const userId = existingUser._id;
  const newRefreshToken = new RefreshToken({
    userId,
    token: refreshToken,
    created_at: decodedRefreshToken.iat,
    expires_at: decodedRefreshToken.exp,
  });

  try {
    await newRefreshToken.save();
  } catch (err) {
    console.error("Error saving refresToken", err);
    throw new Error("Failed to save refreshtoken");
  }

  let profileImage = existingUser.profileImage;
  const tokenResponse = {
    ...tokenData,
    accessToken: accessToken,
    refresToken: refreshToken,
    profileImage: profileImage
  };

  return tokenResponse;
};

const createUser = async (
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  profileImage: string
) => {
  const tokenPassword = process.env.tokenPassword;
  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    throw new Error("Failed to create user");
  }

  if (existingUser) {
    throw new Error("Email has alreay been used, Please try another email");
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    throw new Error("Could not create user");
  }

  let isDeleted = false;

  if (profileImage == "") {
    profileImage = "default-image.jpg";
  }

  const createUser = new User({
    email,
    firstName,
    lastName,
    password: hashPassword,
    isDeleted,
    profileImage,
  });

  try {
    await createUser.save();
  } catch (err) {
    throw new Error("Failed to create user");
  }
};

const updateUser = async (
  userId: string,
  username: string,
  email: string,
  password: string
) => {
  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    throw new Error("No user found");
  }

  if (!existingUser || existingUser.isDeleted) {
    throw new Error("No user found");
  }

  let hashPassword;
  try {
    hashPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    throw new Error("Hashing of password failed");
  }

  existingUser.email = email;
  existingUser.password = hashPassword;

  try {
    await existingUser.save();
  } catch (err) {
    throw new Error("Update User failed");
  }
};

const deleteUser = async (userId: string) => {
  let existingUser;
  try {
    existingUser = await User.findById(userId);
  } catch (err) {
    throw new Error("Delete User failed!");
  }

  if (!existingUser) {
    throw new Error("No user to delete");
  }

  existingUser.isDeleted = true;

  try {
    await existingUser.save();
  } catch (err) {
    throw new Error("Failed to update isDeleted");
  }
};

export default {
  getAllUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  deleteUser,
};
