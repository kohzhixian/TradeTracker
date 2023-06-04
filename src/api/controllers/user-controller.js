const userService = require('../services/user-service');

const getAllUsers = async (req, res, next) => {
  try{
    const users = await userService.getAllUsers('-password');
    res.status(200).json({users: users});
  }catch(err){
    next(err);
  }
};

const getUserById = async (req, res, next) => {
    const userId = req.params.userId;
    try{
        const user = await userService.getUserById(userId);
        res.status(200).json({user: user});
    }catch(err){
        next(err);
    }
};

const login = async (req, res, next) => {
    const {email, password} = req.body;
    const loginTokenData = await userService.login(email, password);
    res.json({loginTokenData: loginTokenData});
}

const createUser = async (req, res, next) => {
    const {email, firstName, lastName, password} = req.body;
    const newUser = await userService.createUser(email, firstName, lastName, password);
    res.status(201).json({tokenData: newUser});
}

module.exports = {
    getAllUsers,
    getUserById,
    login,
    createUser
}
