import CryptoJS from "crypto-js";
import { Service } from "typedi";
import { UserInputPayloadDTO } from "../../dto/User.dto";
import config from "../../config/index";
import Logger from "../../loaders/logger";
import { UserRepository } from "../../repositories/User.repository";
import { Api500Error } from "../../util/error-handler/Api500Error";
import { Api409Error } from "../../util/error-handler/Api409Error";

@Service()
export class SignUpService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(userInputDTO: UserInputPayloadDTO) {
    Logger.debug("Inside signup service");
    const { username, email, password, profilePic, isAdmin } = userInputDTO;

    if (!config.SecretKey) {
      throw new Api500Error("Missing property in .env");
    }

    const userRepository = new UserRepository();

    const doesUserExist = await userRepository.getUserByEmail(email);

    if (doesUserExist) {
      throw new Api409Error("User already exist!");
    }

    const hashedPassword = CryptoJS.AES.encrypt(
      password,
      config.SecretKey
    ).toString();

    const newUser = await this.userRepository.createUser(
      username,
      email,
      hashedPassword,
      profilePic,
      isAdmin
    );

    // const newUser = await userRepository.createUser(
    //   username,
    //   email,
    //   hashedPassword,
    //   profilePic,
    //   isAdmin
    // );

    return newUser;
  }
}
