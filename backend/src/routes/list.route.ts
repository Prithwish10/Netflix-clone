"use strict";

import { Router, Request, Response, NextFunction } from "express";
import { ListController } from "../controllers/List.controller";
import { authenticate, authRole } from "../middleware/auth.middleware";

const route = Router();

export default (app: Router) => {
  app.use("/lists", route);

  const listController = new ListController();

  route.post(
    "/",
    authenticate,
    authRole("Admin"),
    async (req: Request, res: Response, next: NextFunction) => {
      await listController.createList(req, res, next);
    }
  );

  route.get(
    "/",
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      await listController.findList(req, res, next);
    }
  );

  route.delete(
    "/:id",
    authenticate,
    authRole("Admin"),
    async (req: Request, res: Response, next: NextFunction) => {
      await listController.deleteList(req, res, next);
    }
  );
};
