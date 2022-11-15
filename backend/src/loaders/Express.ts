import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
// import routes from '../routes';
import config from "../config/index";
export default ({ app }: { app: Application }) => {

  app.enable("trust proxy");

  app.use(cors());

  app.use(express.json());

  // Load API routes
  // app.use(config.api.prefix, routes(app));

  /// catch 404 and forward to error handler
  app.use((req: Request, res: Response, next: NextFunction) => {
    const err: any = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  /// error handlers
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    /**
     * Handle 401 thrown by express-jwt library
     */
    if (err.name === "UnauthorizedError") {
      return res.status(err.status).send({ message: err.message }).end();
    }
    return next(err);
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message,
      },
    });
  });
};
