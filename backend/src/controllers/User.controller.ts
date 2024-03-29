import { Request, Response, NextFunction } from "express";
import { Service } from "typedi";
import { UserService } from "../services/user/User.service";
import { updateUserSchema } from "../services/user/user.validation.schema";
import { Api403Error } from "../util/error-handler/Api403Error";

@Service()
export class UserController {
  constructor(private readonly userService: UserService) {}

  public async findUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.findById(req.params.id);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  public async findAllUsers(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user.isAdmin) {
        throw new Api403Error("You are not allowed to access this resource");
      }

      let page: number = req.query.page
        ? parseInt(req.query.page as string)
        : 1;
      let limit: number = req.query.limit
        ? parseInt(req.query.limit as string)
        : 20;
      let order: number = req.query.order
        ? (req.query.order as string) === "asc"
          ? 1
          : -1
        : -1;
      let sort = req.query.sort ? (req.query.sort as string) : "updatedAt";

      if (Number.isNaN(page) || page <= 0) page = 1;
      if (Number.isNaN(limit) || limit < 0 || limit >= 21) limit = 20;

      const users = await this.userService.findAll(page, limit, order, sort);

      return res.status(200).json({
        success: true,
        statusCode: 200,
        users,
      });
    } catch (err) {
      next(err);
    }
  }

  public async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await updateUserSchema.validateAsync(req.body);

      const { email, username, password, profilePic } = req.body;
      const id = req.params.id;
      const user = await this.userService.update({
        id,
        username,
        email,
        password,
        profilePic,
      });

      return res.status(200).json({
        success: true,
        message: "Record updated successfully!",
        statusCode: 200,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  public async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await this.userService.deleteById(req.params.id);

      return res.status(204).json({
        success: true,
        message: "Record deleted successfully!",
        statusCode: 204,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  public async getUserStat(req: Request, res: Response, next: NextFunction) {
    try {
      const userStats = await this.userService.getUserStat();

      return res.status(200).json({
        success: true,
        statusCode: 200,
        userStats,
      });
    } catch (err) {
      next(err);
    }
  }
}
