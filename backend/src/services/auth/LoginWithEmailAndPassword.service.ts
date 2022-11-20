import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import config from "../../config/index";
import Logger from "../../loaders/logger";
import { UserRepository } from "../../repositories/User.repository";
import { Api500Error } from "../../util/error-handler/Api500Error";
import { Api401Error } from "../../util/error-handler/Api401Error";
import { Service } from "typedi";

@Service()
export class LoginWithEmailAndPasswordService {
  constructor(private readonly userRepository: UserRepository) {}

  async loginWithEmailAndPassword(email: string, password: string) {
    const userRepository = new UserRepository();
    const user = await userRepository.getUserByEmail(email);

    if (!user) {
      throw new Api401Error("Unauthorised");
    }

    if (!config.SecretKey || !config.jwtSecret) {
      throw new Api500Error("Missing property in .env");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, config.SecretKey);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      throw new Api401Error("Unauthorised");
    }

    const accessToken: string = jwt.sign(
      { id: user._id.toString(), name: user.username, isAdmin: user.isAdmin },
      config.jwtSecret,
      { expiresIn: "5d" }
    );

    const refreshToken: string = jwt.sign(
      { id: user._id.toString(), name: user.username, isAdmin: user.isAdmin },
      config.jwtSecret,
      { expiresIn: "10d" }
    );

    const { password: userPassword, ...restUserInfo } = user._doc;

    return { ...restUserInfo, accessToken, refreshToken };
  }
}
