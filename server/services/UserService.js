import User from "../models/User.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import mailService from "../services/MailService.js";
import tokenService from "./TokenService.js";
import UserDto from "../dtos/UserDto.js";

class UserService {
  async registration(email, password) {
    const condidate = await User.findOne({ email });

    if (condidate) {
      throw new Error(`User with email: ${email} already exist`);
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid();
    const user = await User.create({
      email,
      password: hashedPassword,
      activationLink,
    });
    await mailService.sendActivationMail(email, activationLink);
    const userDto = new UserDto(user);
    const token = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, token.refreshToken);
    return {
      ...token,
      user: userDto,
    };
  }
}

export default new UserService();
