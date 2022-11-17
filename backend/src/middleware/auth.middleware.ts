import { Request, Response, NextFunction } from "express";
import { Api401Error } from "../util/error-handler/Api401Error";
import config from "../config/index";
import { Api500Error } from "../util/error-handler/Api500Error";
import jwt from "jsonwebtoken";
import { IUser } from "../dto/IUser.dto";
import { TokenPayload } from "../dto/Token-payload.dto";

declare global {
  namespace Express {
    interface Request {
      user: TokenPayload;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    throw new Api401Error("Unauthorised");
  }

  const token = authHeader.split(" ")[1];

  if (!config.jwtSecret) {
    throw new Api500Error("Missing property in .env");
  }

  try {
    const payload = jwt.verify(token, config.jwtSecret) as TokenPayload;
    console.log('Payload => ',payload)
    req.user = payload;
    next();
  } catch (err) {
    if (err instanceof Error) {
      throw new Api500Error(err.message);
    }
  }
}
