import { Request, Response, NextFunction } from "express";
import { LoginWithEmailAndPasswordService } from "../services/auth/LoginWithEmailAndPassword.service";
import { SignUpService } from "../services/auth/SignUp.service.";
import { resetPasswordSchema } from "../services/auth/auth.validation.schema";
import { ResetPasswordService } from "../services/auth/ResetPassword.service";
import Logger from "../loaders/logger";
import {
  loginWithEmailAndPasswordSchema,
  signupSchema,
} from "../services/auth/auth.validation.schema";
import { Service } from "typedi";

@Service()
export class AuthController {
  constructor(
    private readonly signupService: SignUpService,
    private readonly loginWithEmailAndPasswordService: LoginWithEmailAndPasswordService,
    private readonly resetPasswordService: ResetPasswordService
  ) {}

  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
      Logger.debug("Calling signup service with body: %o", req.body);
      // Validating the request body
      await signupSchema.validateAsync(req.body);

      const user = await this.signupService.register(req.body);

      return res.status(201).json({
        success: true,
        message: "Thanks for signing in!",
        statusCode: 201,
        user,
      });
    } catch (err) {
      Logger.error("Error occured: ", err);
      next(err);
    }
  }

  public async signInWithEmailAndPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      Logger.debug("Calling signup service with body: %o", req.body);
      // Validating the request body
      await loginWithEmailAndPasswordSchema.validateAsync(req.body);

      const { email, password } = req.body;
      const data =
        await this.loginWithEmailAndPasswordService.loginWithEmailAndPassword(
          email,
          password
        );

      return res.status(201).json({
        success: true,
        message: "You have successfully logged in!",
        statusCode: 201,
        data,
      });
    } catch (err) {
      Logger.error("Error occured: ", err);
      next(err);
    }
  }

  public async signInWithEmailOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    Logger.debug("Calling signup service with body: %o", req.body);
  }

  public async signInWithMobileOTP(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    Logger.debug("Calling signup service with body: %o", req.body);
  }

  public async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      await resetPasswordSchema.validateAsync(req.body);

      const { email, password } = req.body;
      const user = await this.resetPasswordService.reset(
        req.params.id,
        req.params.token,
        email,
        password
      );
      console.log("user =>", user);
      return res.status(201).json({
        success: true,
        message: "Password reset successfully!",
        statusCode: 201,
        user,
      });
    } catch (err) {
      next(err);
    }
  }

  public async forgotPassword(
    req: Request,
    res: Response,
    next: NextFunction
  ) {}
}
