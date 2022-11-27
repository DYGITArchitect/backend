import jwt from "jsonwebtoken";
import token from "../models/Token.js";

class TokeService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "15m",
    });
    console.log("1");
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "15d",
    });

    return {
      accessToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await token.findOne({ userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }

    const sevedToken = await token.create({ user: userId, refreshToken });
    return sevedToken;
  }
}

export default new TokeService();
