const userSchema = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = async (condition) => {
  try {
    if (condition) {
      return await userSchema.find().select(condition).exec();
    }
    return await userSchema.find().exec();
  } catch (err) {
    throw new Error("Could not retrieve users");
  }
};

const getUserById = async (userId) => {
  try {
    return await userSchema.findById(userId);
  } catch (err) {
    throw new Error("No user found with userId");
  }
};

const login = async (email, password) => {
  let existingUser;
  try {
    existingUser = await userSchema.findOne({ email: email });
  } catch (err) {
    throw new Error("Login failed, Please try again");
  }

  if (!existingUser) {
    throw new Error("User does not exist");
  }

  let isPasswordValid;
  try {
    isPasswordValid = bcrypt.compare(password, existingUser.password);
  } catch (err) {
    throw new Error("Wrong credentials, Please try again");
  }

  const tokenData = {
    name: existingUser.firstName + existingUser.lastName,
    email: existingUser.email,
  };
  let token;
  try {
    token = jwt.sign(tokenData, "super-secret-password", { expiresIn: "1h" });
  } catch (err) {
    throw new Error("Token creation failed");
  }
  tokenData.token = token;
  return tokenData;
};

const createUser = async (email, firstName, lastName, password) => {
  let existingUser;
  try {
    existingUser = await userSchema.findOne({ email: email });
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

  const createUser = new userSchema({
    email,
    firstName,
    lastName,
    password: hashPassword,
  });

  try {
    await createUser.save();
  } catch (err) {
    throw new Error("Failed to create user");
  }

  const tokenData = {
    name: createUser.firstName + createUser.lastName,
    email: createUser.email,
  };
  let token;
  try {
    token = jwt.sign(tokenData, "super-secret-password", { expiresIn: "1h" });
  } catch (err) {
    throw new Error("Token creation failed");
  }
  tokenData.token = token;
  return tokenData;
};

module.exports = {
  getAllUsers,
  getUserById,
  login,
  createUser,
};
