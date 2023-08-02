import RefreshToken from "../models/refreshToken-model";
import { HttpError } from "../models/http-error";

const logout = async (userId: string) => {
  const result = await RefreshToken.deleteMany({ userId: userId });

  if (result.deletedCount == 0) {
    throw new HttpError("No token found for userId", 404);
  }
};

//This function is just for development purposes
const getAllRefreshTokens = async () => {
  const result = await RefreshToken.find();

  if (!result) {
    throw new HttpError("No refresh token found", 404);
  }
  return result;
};

export default { logout, getAllRefreshTokens };
