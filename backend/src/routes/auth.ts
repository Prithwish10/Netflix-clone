'use strict'

import { Router, Request, Response, NextFunction } from 'express';
import { AuthController } from '../controllers/Auth.controller';

const route = Router();

export default (app: Router) => {
    app.use('/auth', route);

    route.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
        const signup = new AuthController();
        await signup.signup(req, res, next);
    });
}
