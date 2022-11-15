import { Request, Response, NextFunction } from "express";
import { LoginWithEmailAndPassword } from "../services/auth/LoginWithEmailAndPassword";
import { SignUp } from "../services/auth/SignUp.service.";
import Logger from '../loaders/logger';
import { signupSchema } from '../services/auth/auth.validation.schema'

export class AuthController {

  public async signup(req: Request, res: Response, next: NextFunction) {
    try {
        Logger.debug('Calling signup service with body: %o', req.body);
        // Validating the request body
        await signupSchema.validateAsync(req.body);

        const signupService = new SignUp();
        const user = await signupService.register(req.body);

        return res.status(201).json({
            success: true,
            message: "Thanks for signing in!",
            data: user
        })
    } catch(err) {
        Logger.error('Error occured: ', err);
        next(err);
    }
  }

  public async signInWithEmailAndPassword(req: Request, res: Response, next: NextFunction) {
    Logger.debug('Calling signup service with body: %o', req.body);
  }

  public async signInWithEmailOTP(req: Request, res: Response, next: NextFunction) {
    Logger.debug('Calling signup service with body: %o', req.body);
  }

  public async signInWithMobileOTP(req: Request, res: Response, next: NextFunction) {
    Logger.debug('Calling signup service with body: %o', req.body);
  }
}
