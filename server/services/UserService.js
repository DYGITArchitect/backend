import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import mailService from "../services/MailService.js";
import tokenService from "./TokenService.js";
import UserDto from "../dtos/UserDto.js";
import ApiError from "../exeptions/api-error.js";

class UserService {
  async registration(email, password) {
    const condidate = await User.findOne({ email });

    if (condidate) {
      throw ApiError.badRequest(`User with email: ${email} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid();
    const user = await User.create({
      email,
      password: hashedPassword,
      activationLink,
    });
    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL} + /api/activate/ + ${activationLink}`
    );
    const userDto = new UserDto(user);
    const token = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, token.refreshToken);
    return {
      ...token,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const user = await User.findOne({ activationLink });

    if (!user) {
      throw ApiError.badRequest(
        `User with link ${activationLink} doesn't exist`
      );
    }

    user.isActivated = true;
    await user.save();
  }

  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }

  async login(email, password) {
    const user = await User.findOne({ email });
    if (!user) {
      throw ApiError.badRequest(`User with email ${email} doesn't exist`);
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.badRequest(`Password incorrect`);
    }

    const userDto = new UserDto(user);
    const token = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, token.refreshToken);
    return {
      ...token,
      user: userDto,
    };
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unathorizedError();
    }

    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.unathorizedError();
    }

    const user = await User.findById(userData.id);
    const userDto = new UserDto(user);
    const token = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, token.refreshToken);
    return {
      ...token,
      user: userDto,
    };
  }

  async getAllUsers() {
    const users = await User.find();
    return users;
  }
}

export default new UserService();
