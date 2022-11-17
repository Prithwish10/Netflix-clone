import { Request, Response, NextFunction } from "express";
import { Api404Error } from "../util/error-handler/Api404Error";
import { BaseError } from "../util/error-handler/BaseError";

const handle422Error = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    return res
      .status(422)
      .json({
        errors: {
          success: false,
          message: err.message,
          statuscode: 422,
        },
      })
      .end();
  }
  return next(err);
};

// const handle404Error = (
//   err: BaseError,
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   console.log("Error => ", err.name);
//   err = new Api404Error("Unauthorised");
//   next(err);
// };

const handleError = (
  err: BaseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.statusCode || 500);
  res.json({
    errors: {
      success: false,
      message: err.message,
      description: err.name,
      statuscode: err.statusCode,
    },
  });
};

export { handle422Error, handleError };
