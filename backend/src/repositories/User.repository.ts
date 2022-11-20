import { Service } from "typedi";
import { UpdateUserPayloadDTO } from "../dto/User.dto";
import Logger from "../loaders/logger";
import User from "../models/User.model";
import { Api500Error } from "../util/error-handler/Api500Error";

@Service()
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

  public async getUsers(
    page: number,
    limit: number,
    order: number,
    sort: string
  ) {
    try {
      const users = await User.find()
        .sort({ [sort]: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      return users;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(err.message);
        throw new Api500Error(err.message);
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
        throw new Api500Error(err.message);
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
        throw new Api500Error(err.message);
      }
    }
  }

  public async updateUserById(user: UpdateUserPayloadDTO) {
    try {
      Logger.debug("Update user by ID Data Access Layer invoked");

      const { id, ...restUserInfo } = user;

      // Logger.debug("Rest user info %o: ", restUserInfo);

      const updatedUser = await User.findByIdAndUpdate(
        id,
        {
          $set: restUserInfo,
        },
        { returnOriginal: false }
      );

      return updatedUser;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while updating user: ${err.message}`);
        throw new Api500Error(err.message);
      }
    }
  }

  public async deleteUserById(id: string) {
    try {
      Logger.debug("Delete user by ID Data Access Layer invoked");

      await User.findByIdAndDelete(id);
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while updating user: ${err.message}`);
        throw new Api500Error(err.message);
      }
    }
  }

  // Get total users per month
  public async getUserStat(monthsArray: String[]) {
    try {
      const userStat = await User.aggregate([
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: 1 },
          },
        },
      ]);

      return userStat;
    } catch (err) {
      if (err instanceof Error) {
        Logger.error(`Error occured while updating user: ${err.message}`);
        throw new Api500Error(err.message);
      }
    }
  }
}
