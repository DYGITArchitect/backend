import User from "../models/User.js";
import bcrypt from "bcrypt";
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
}

export default new UserService();
