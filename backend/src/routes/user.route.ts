"use strict";

import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/User.controller";
import { authenticate, authRole } from "../middleware/auth.middleware";

const route = Router();

export default (app: Router) => {
  app.use("/users", route);

  const userController = new UserController();

  route.get(
    "/",
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      await userController.findAllUsers(req, res, next);
    }
  );

  route.get(
    "/stats",
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      await userController.getUserStat(req, res, next);
    }
  );

  route.get(
    "/:id",
    authenticate,
    authRole,
    async (req: Request, res: Response, next: NextFunction) => {
      await userController.findUserById(req, res, next);
    }
  );

  route.put(
    "/:id",
    authenticate,
    authRole,
    async (req: Request, res: Response, next: NextFunction) => {
      await userController.updateUser(req, res, next);
    }
  );

  route.delete(
    "/:id",
    authenticate,
    authRole,
    async (req: Request, res: Response, next: NextFunction) => {
      await userController.deleteUserById(req, res, next);
    }
  );
};
