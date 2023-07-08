const userSchema = require("../models/user-model");
const refreshtokenSchema = require("../models/refreshToken-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: '.env.dev'});

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
    return await userSchema.findById(userId).select('-password');
  } catch (err) {
    throw new Error("No user found with userId");
  }
};

const login = async (email, password) => {
  const tokenPassword = process.env.tokenPassword;
  let existingUser;
  try {
    existingUser = await userSchema.findOne({ email: email });
  } catch (err) {
    throw new Error("Login failed, Please try again");
  }

  if (!existingUser || existingUser.isDeleted === 'Yes') {
    throw new Error("User does not exist");
  }

  let isPasswordValid;
  try {
    isPasswordValid = await bcrypt.compare(password, existingUser.password);
  } catch (err) {
    throw new Error("Wrong credentials, Please try again");
  }

  if(!isPasswordValid){
    throw new Error("Wrong credentials, Please try again");
  }

  const tokenData = {
    name: existingUser.firstName + existingUser.lastName,
    email: existingUser.email,
  };
  let token;
  try {
    token = jwt.sign(tokenData, tokenPassword, { expiresIn: "1h" });
  } catch (err) {
    throw new Error("Token creation failed");
  }

  let decodedToken;
  try{
    decodedToken = jwt.verify(token, tokenPassword);
  }catch(err){
    throw new Error("Failed to verify token");
  }
  let userId = existingUser._id;

  const newRefreshToken = new refreshtokenSchema({
    userId,
    token,
    created_at: decodedToken.iat,
    expires_at: decodedToken.exp
  })

  try{
    await newRefreshToken.save();
  }catch(err){
    throw new Error("Failed to save token");
  }

  tokenData.token = token;
  return tokenData;
};

const createUser = async (email, firstName, lastName, password) => {
  const tokenPassword = process.env.tokenPassword;
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

  let isDeleted = 'No';

  const createUser = new userSchema({
    email,
    firstName,
    lastName,
    password: hashPassword,
    isDeleted
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
    token = jwt.sign(tokenData, tokenPassword, { expiresIn: "1h" });
  } catch (err) {
    throw new Error("Token creation failed");
  }
  tokenData.token = token;
  return tokenData;
};

const updateUser = async (userId, username, email, password) => {
  let existingUser;
  try{
    existingUser = await userSchema.findById(userId);
  }catch(err){
    throw new Error('No user found');
  }

  if(!existingUser){
    throw new Error('No user found');
  }

  let hashPassword;
  try{
    hashPassword = await bcrypt.hash(password, 12);
  }catch(err){
    throw new Error('Hashing of password failed');
  }

  existingUser.username = username;
  existingUser.email = email;
  existingUser.password = hashPassword;

  try{
    await existingUser.save();
  }catch(err){
    throw new Error('Update User failed');
  }

}

const deleteUser = async (userId) => {
  let existingUser;
  try{
    existingUser = await userSchema.findById(userId);
  }catch(err){
    throw new Error('Delete User failed!');
  }

  if(!existingUser){
    throw new Error('No user to delete');
  }

  existingUser.isDeleted = 'Yes';

  try{
    await existingUser.save();
  }catch(err){
    throw new Error('Failed to update isDeleted');
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  deleteUser
};
