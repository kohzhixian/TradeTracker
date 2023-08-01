import RefreshToken from "../models/refreshToken-model";

const logout = async (userId: string) => {
  const result = await RefreshToken.deleteMany({ userId: userId });

  if (result.deletedCount == 0) {
    throw new Error("No token found for userId");
  }
};

//This function is just for development purposes
const getAllRefreshTokens = async () => {
  const result = await RefreshToken.find();

  if (!result) {
    throw new Error("No refresh token found");
  }
  return result;
};

export default { logout, getAllRefreshTokens };
