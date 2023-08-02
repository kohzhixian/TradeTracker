import { RequestHandler } from "express";
import refreshTokenService from "../services/refreshToken-service";
import { HttpError } from "../models/http-error";

const logout: RequestHandler = async (req, res, next) => {
  const { userId } = req.body;
  try {
    await refreshTokenService.logout(userId);
    res.json({ message: "Token Deleted" });
  } catch (err) {
    const error = new HttpError("Something went wrong, Unable to logout", 500);
    return next(error);
  }
};

const getAllRefreshTokens: RequestHandler = async (req, res, next) => {
  try {
    const result = await refreshTokenService.getAllRefreshTokens();
    res.json({ refreshTokens: result });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong, could not find refreshToken",
      500
    );
    return next(error);
  }
};

export default { logout, getAllRefreshTokens };
