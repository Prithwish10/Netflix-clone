import CryptoJS from "crypto-js";
import { Service } from "typedi";
import { UserRepository } from "../../repositories/User.repository";
import { Api401Error } from "../../util/error-handler/Api401Error";
import { Api500Error } from "../../util/error-handler/Api500Error";
import config from "../../config/index";
import Logger from "../../loaders/logger";
import { UpdateUserPayloadDTO } from "../../dto/User.dto";

@Service()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(page: number, limit: number, order: number, sort: string) {
    Logger.debug("Find user by Id method invoked");

    const users = await this.userRepository.getUsers(page, limit, order, sort);

    return users;
  }

  async findById(id: string) {
    Logger.debug("Find user by Id method invoked");

    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new Api401Error("User not found");
    }

    return user;
  }

  async update(userPayload: UpdateUserPayloadDTO) {
    Logger.debug("Update user method invoked");

    const { id, username, email, password, profilePic } = userPayload;

    if (!config.SecretKey || !config.jwtSecret) {
      throw new Api500Error("Missing property in .env");
    }

    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new Api401Error("Unathorised");
    }

    let hashedPassword: string = user.password;

    if (password) {
      hashedPassword = CryptoJS.AES.encrypt(
        password,
        config.SecretKey
      ).toString();
    }

    const updatedUser = await this.userRepository.updateUserById({
      id,
      username: username ? username : user.username,
      email: email ? email : user.email,
      password: hashedPassword,
      profilePic: profilePic ? profilePic : user.profilePic,
    });

    return updatedUser;
  }

  async deleteById(id: string) {
    Logger.debug("Delete user method invoked");

    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new Api401Error("Unathorised");
    }

    await this.userRepository.deleteUserById(id);
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

    const userStats = await this.userRepository.getUserStat(monthsArray);

    return userStats;
  }
}
