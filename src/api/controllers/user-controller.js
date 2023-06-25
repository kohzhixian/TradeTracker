const userService = require("../services/user-service");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers("-password");
    res.status(200).json({ users: users });
  } catch (err) {
    next(err);
  }
};

const getUserById = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    const user = await userService.getUserById(userId);
    res.status(200).json({ user: user });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const loginTokenData = await userService.login(email, password);
    res.json({ loginTokenData: loginTokenData });
  } catch (err) {
    next(err);
  }
};

const createUser = async (req, res, next) => {
  const { email, firstName, lastName, password } = req.body;
  try {
    const newUser = await userService.createUser(
      email,
      firstName,
      lastName,
      password
    );
    res.status(201).json({ tokenData: newUser });
  } catch (err) {
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { username, email, password } = req.body;
  try {
    await userService.updateUser(userId, username, email, password);
    res.json({ Message: "Update successful" });
  } catch (err) {
    next(err);
  }
};

const deleteUser = async (req, res, next) => {
  const userId = req.params.userId;
  try {
    await userService.deleteUser(userId);
    res.json({ Message: "Delete successful" });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getAllUsers,
  getUserById,
  login,
  createUser,
  updateUser,
  deleteUser,
};
