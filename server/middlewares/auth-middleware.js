import ApiError from "../exeptions/api-error.js";
import tokenService from "../services/TokenService.js";

export default function (req, res, next) {
  try {
    const authrisationHeader = req.headers.authorization;
    if (!authrisationHeader) {
      return next(ApiError.unathorizedError());
    }

    const accessToken = authrisationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unathorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.unathorizedError());
    }

    req.user = userData;
    next();
  } catch (error) {
    return next(ApiError.unathorizedError());
  }
}
