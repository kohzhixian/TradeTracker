import User from "../models/user-model";
import RefreshToken from "../models/refreshToken-model";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";
import {
  deactivateAccountDTO,
  loginDTO,
  registerDTO,
  updatePasswordDTO,
  updateProfileDTO,
} from "../../interface/user-interface";
import { HttpError } from "../models/http-error";

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
    throw new HttpError("No user found with userId", 404);
  } else {
    return existingUser;
  }
};

const login = async (loginDTO: loginDTO) => {
  const tokenPassword = String(process.env.tokenPassword);
  const refreshTokenPassword = String(process.env.refreshTokenPassword);

  const existingUser = await User.findOne({ email: loginDTO.email });

  if (!existingUser || existingUser.isDeleted) {
    throw new HttpError("User does not exist", 404);
  }

  const isPasswordValid = await bcrypt.compare(
    loginDTO.password,
    existingUser.password
  );

  if (!isPasswordValid) {
    throw new HttpError("Wrong credentials, Please try again", 404);
  }

  const tokenData = {
    firstName: existingUser.firstName,
    lastName: existingUser.lastName,
    email: existingUser.email,
  };

  const accessToken = jwt.sign(tokenData, tokenPassword, { expiresIn: "1h" });
  if (!accessToken) {
    throw new HttpError("Failed to sign access token", 404);
  }

  const refreshToken = jwt.sign(tokenData, refreshTokenPassword, {
    expiresIn: "7d",
  });

  if (!refreshToken) {
    throw new HttpError("Failed to sign refresh token", 404);
  }

  const decodedRefreshToken = jwt.verify(
    refreshToken,
    refreshTokenPassword
  ) as JwtPayload;

  if (!decodedRefreshToken) {
    throw new HttpError("Failed to verify refresh token", 404);
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
    throw new HttpError("Faield to create refresh token", 404);
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

const register = async (registerDTO: registerDTO) => {
  const existingUser = await User.findOne({ email: registerDTO.email });
  if (existingUser) {
    throw new HttpError(
      "Email has alreay been used, Please try another email",
      404
    );
  }

  const hashPassword = await bcrypt.hash(registerDTO.password, 12);

  let isDeleted = false;

  if (registerDTO.profileImage == "") {
    registerDTO.profileImage = "default-image.jpg";
  }
  if (registerDTO.companyCode !== "ABC") {
    throw new HttpError("Invalid Company Code", 404);
  }

  const createUserDTO = {
    ...registerDTO,
    isDeleted: isDeleted
  }
  const createUser = new User(createUserDTO);

  const result = await createUser.save();
  if (!result) {
    throw new HttpError("Failed to create user", 404);
  }
};

const updateProfile = async (updateProfileDTO: updateProfileDTO) => {
  const existingUser = await User.findById(updateProfileDTO.userId);

  if (!existingUser || existingUser.isDeleted) {
    throw new HttpError("No user found", 404);
  }

  existingUser.firstName = updateProfileDTO.firstName;
  existingUser.lastName = updateProfileDTO.lastName;
  existingUser.email = updateProfileDTO.email;

  const result = await existingUser.save();

  if (!result) {
    throw new HttpError("Failed to update Profile", 404);
  }
};

const updatePassword = async (updatePasswordDTO: updatePasswordDTO) => {
  const existingUser = await User.findOne({ _id: updatePasswordDTO.userId });

  if (!existingUser) {
    throw new HttpError("User not found", 404);
  }

  const isCurrentPassword = await bcrypt.compare(
    updatePasswordDTO.currentPassword,
    existingUser.password
  );

  if (!isCurrentPassword) {
    throw new HttpError("Current Password is wrong", 404);
  }

  let hashedNewPassword = await bcrypt.hash(updatePasswordDTO.newPassword, 12);
  existingUser.password = hashedNewPassword;

  const result = await existingUser.save();
  if (!result) {
    throw new HttpError("Failed to save new password", 404);
  }
};

const deactivateAccount = async (
  deactivateAccountDTO: deactivateAccountDTO
) => {
  const existingUser = await User.findById(deactivateAccountDTO.userId);

  if (!existingUser) {
    throw new HttpError("No user to delete", 404);
  }

  existingUser.isDeleted = true;

  const result = await existingUser.save();

  if (!result) {
    throw new HttpError("Failed to delete user", 404);
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
