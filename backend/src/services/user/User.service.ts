import CryptoJS from "crypto-js";
import { UserRepository } from "../../repositories/User.repository";
import { Api401Error } from "../../util/error-handler/Api401Error";
import { Api403Error } from "../../util/error-handler/Api403Error";
import { Api500Error } from "../../util/error-handler/Api500Error";
import config from "../../config/index";
import Logger from "../../loaders/logger";
import { Api400Error } from "../../util/error-handler/Api400Error";
import { UpdateUserPayload } from "../../dto/IUser.dto";

export class UserService {
  async findAll(page: number, limit: number, order: number, sort: string) {
    Logger.debug("Find user by Id method invoked");

    if (!config.SecretKey || !config.jwtSecret) {
      throw new Api500Error("Missing property in .env");
    }

    const userRepository = new UserRepository();
    const users = await userRepository.getUsers(page, limit, order, sort);

    return users;
  }

  async findById(id: string) {
    Logger.debug("Find user by Id method invoked");

    if (!config.SecretKey || !config.jwtSecret) {
      throw new Api500Error("Missing property in .env");
    }

    const userRepository = new UserRepository();
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new Api401Error("User not found");
    }

    return user;
  }

  async update(userPayload: UpdateUserPayload) {
    Logger.debug("Update user method invoked");

    const { id, username, email, password, profilePic } = userPayload;

    if (!config.SecretKey || !config.jwtSecret) {
      throw new Api500Error("Missing property in .env");
    }

    const userRepository = new UserRepository();
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new Api401Error("Unathorised");
    }

    let hashedPassword;

    if (password) {
      hashedPassword = CryptoJS.AES.encrypt(
        password,
        config.SecretKey
      ).toString();
    }

    const updatedUser = await userRepository.updateUserById({
      id,
      username: username ? username : user.username,
      email: email ? email : user.email,
      password: password ? hashedPassword : user.password,
      profilePic: profilePic ? profilePic : user.profilePic,
    });

    return updatedUser;
  }

  async deleteById(id: string) {
    Logger.debug("Delete user method invoked");

    if (!config.SecretKey || !config.jwtSecret) {
      throw new Api500Error("Missing property in .env");
    }

    const userRepository = new UserRepository();
    const user = await userRepository.getUserById(id);

    if (!user) {
      throw new Api401Error("Unathorised");
    }

    await userRepository.deleteUserById(id);
  }

  async getUserStat() {
    Logger.debug("user stat method invoked");
    const today = new Date();
    const lastYear = today.setFullYear(today.getFullYear() - 1);

    const monthsArray = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const userRepository = new UserRepository();
    const userStats = await userRepository.getUserStat(monthsArray);

    return userStats;
  }
}
