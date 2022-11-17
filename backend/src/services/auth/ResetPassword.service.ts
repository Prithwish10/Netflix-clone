import CryptoJS from "crypto-js";
import { UserRepository } from "../../repositories/User.repository";
import { Api401Error } from "../../util/error-handler/Api401Error";
import { Api403Error } from "../../util/error-handler/Api403Error";
import { Api500Error } from "../../util/error-handler/Api500Error";
import config from "../../config/index";
import Logger from "../../loaders/logger";
import { Api400Error } from "../../util/error-handler/Api400Error";

export class ResetPasswordService {
  async reset(userId: string, token: string, email: string, password: string) {
    Logger.debug("Reset Password Service invoked");
    if (!config.SecretKey || !config.jwtSecret) {
      throw new Api500Error("Missing property in .env");
    }

    const userRepository = new UserRepository();
    const user = await userRepository.getUserById(userId);

    if (!user) {
      throw new Api401Error("Unathorised");
    }

    if (user.email !== email) {
      throw new Api403Error("Forbidden");
    }

    const bytes = CryptoJS.AES.decrypt(user.password, config.SecretKey);
    const currentPassword = bytes.toString(CryptoJS.enc.Utf8);

    if(currentPassword === password) {
        throw new Api400Error("New password is same as the old password");
    }

    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      config.SecretKey
    ).toString();

    const updatedUser = await userRepository.updateUserById({
      id: userId,
      email,
      password: hashedPassword,
    });

    return updatedUser;
  }
}
