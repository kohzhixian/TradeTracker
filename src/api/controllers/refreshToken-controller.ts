import { RequestHandler } from "express";
import refreshTokenService from "../services/refreshToken-service";

const logout:RequestHandler = async(req, res, next) => {
    const userId = req.params.userId;
    try{
        await refreshTokenService.logout(userId);
        res.json({message: "Token Deleted"});
    }catch(err){
        next(err);
    }
}

export default {logout};