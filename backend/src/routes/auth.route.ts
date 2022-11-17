'use strict'

import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/Auth.controller';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    const authController = new AuthController();

    route.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
        await authController.signup(req, res, next);
    });

    route.post('/signin', async (req: Request, res: Response, next: NextFunction) => {
        await authController.signInWithEmailAndPassword(req, res, next);
    });
}
