const refreshTokenService = require("../services/refreshToken-service");

const getTokenByUserId = async(req, res, next) => {

}

const logout = async(req, res, next) => {
    const userId = req.params.userId;
    try{
        await refreshTokenService.logout(userId);
        res.json({message: "Token Deleted"});
    }catch(err){
        next(err);
    }
}

module.exports = {
    getTokenByUserId,
    logout
}