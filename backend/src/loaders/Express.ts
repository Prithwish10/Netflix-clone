import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "../routes/index";
import config from "../config/index";
import { BaseError } from "../util/error-handling/BaseError";
import { handle404Error, handle422Error, handleError } from '../middleware/ErrorHandling';

export default ({ app }: { app: Application }) => {
  app.enable("trust proxy");

  app.use(cors());

  app.use(express.json());

  // Load API routes
  app.use(config.api.prefix, routes());

  // catch 404 and forward to error handler
  app.use(handle404Error);

  // catch 422 Error and forward to error handler
  app.use(handle422Error);

  /// error handlers
  // app.use((err: ResponseError, req: Request, res: Response, next: NextFunction) => {
  //   /**
  //    * Handle 401 thrown by express-jwt library
  //    */
  //   if (err.name === "UnauthorizedError") {
  //     return res.status(err.status || 401).send({ message: err.message }).end();
  //   }
  //   return next(err);
  // });

  app.use(handleError);
};
