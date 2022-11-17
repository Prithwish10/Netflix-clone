import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import routes from "../routes/index";
import config from "../config/index";
import { BaseError } from "../util/error-handler/BaseError";
import { handle422Error, handleError } from '../middleware/error-handler.middleware';

export default ({ app }: { app: Application }) => {
  
  app.enable("trust proxy");

  app.use(cors());

  app.use(express.json());
  
  // Load API routes
  app.use(config.api.prefix, routes());

   // catch 422 Error and forward to error handler
   app.use(handle422Error);

  // error handlers
  app.use(handleError);
};
