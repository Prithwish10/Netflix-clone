"use strict";

import { Router, Request, Response, NextFunction } from "express";
import { MovieController } from "../controllers/Movie.controller";
import { authenticate, authRole } from "../middleware/auth.middleware";

const route = Router();

export default (app: Router) => {
  app.use("/movies", route);

  const movieController = new MovieController();

  route.get(
    "/",
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      await movieController.findAllMovies(req, res, next);
    }
  );

  route.get(
    "/random",
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      await movieController.findRandomMovie(req, res, next);
    }
  );

  route.get(
    "/:id",
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      await movieController.findMovieById(req, res, next);
    }
  );

  route.post(
    "/",
    authenticate,
    authRole("Admin"),
    async (req: Request, res: Response, next: NextFunction) => {
      await movieController.createMovie(req, res, next);
    }
  );

  route.put(
    "/:id",
    authenticate,
    authRole("Admin"),
    async (req: Request, res: Response, next: NextFunction) => {
      await movieController.updateMovieById(req, res, next);
    }
  );

  route.delete(
    "/:id",
    authenticate,
    authRole("Admin"),
    async (req: Request, res: Response, next: NextFunction) => {
      await movieController.deleteMovieById(req, res, next);
    }
  );
};
