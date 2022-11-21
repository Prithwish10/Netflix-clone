"use strict";

import { Router, Request, Response, NextFunction } from "express";
import Container from "typedi";
import { AuthController } from "../controllers/Auth.controller";
import { authenticate, authRole } from "../middleware/auth.middleware";

const route = Router();

export default (app: Router) => {
  app.use("/auth", route);

  const authController = Container.get(AuthController);

  route.post(
    "/signup",
    async (req: Request, res: Response, next: NextFunction) => {
      await authController.signup(req, res, next);
    }
  );

  route.post(
    "/signin",
    async (req: Request, res: Response, next: NextFunction) => {
      await authController.signInWithEmailAndPassword(req, res, next);
    }
  );

  route.put(
    "/password-reset/:id/:token",
    authenticate,
    authRole("All"),
    async (req: Request, res: Response, next: NextFunction) => {
      await authController.resetPassword(req, res, next);
    }
  );
};
