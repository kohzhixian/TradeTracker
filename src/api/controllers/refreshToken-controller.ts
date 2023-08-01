import { RequestHandler } from "express";
import refreshTokenService from "../services/refreshToken-service";

const logout: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await refreshTokenService.logout(userId);
    res.json({ message: "Token Deleted" });
  } catch (err) {
    next(err);
  }
};

const getAllRefreshTokens: RequestHandler = async (req, res, next) => {
  try {
    const result = await refreshTokenService.getAllRefreshTokens();
    res.json({ refreshTokens: result });
  } catch (err) {
    next(err);
  }
};

export default { logout, getAllRefreshTokens };
