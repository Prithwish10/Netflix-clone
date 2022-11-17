import Logger from "../loaders/logger";
import User from "../models/User.model";
import { Api409Error } from "../util/error-handler/Api409Error";
import { Api500Error } from "../util/error-handler/Api500Error";

export class UserRepository {
  public async createUser(
    username: string,
    email: string,
    password: string,
    profilePic?: string,
    isAdmin?: string
  ) {
    const newUser = new User({
      username,
      email,
      password,
      profilePic,
      isAdmin,
    });

    try {
      const user = await newUser.save();
      return { user };
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api500Error(err.message);
      }
    }
  }

  public async getUsers() {
    try {
      const users = await User.find();
      return users;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api409Error(err.message);
      }
    }
  }

  public async getUserById(id: string) {
    try {
      const user = await User.findById(id);
      return user;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api409Error(err.message);
      }
    }
  }

  public async getUserByEmail(email: string) {
    try {
      const user = await User.findOne({ email });
      return user;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api409Error(err.message);
      }
    }
  }
}
