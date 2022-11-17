'use strict'

import { Router, Request, Response, NextFunction } from 'express';
import { authenticate } from '../middleware/auth.middleware'

const route = Router();

export default (app: Router) => {
    app.use('/users', route);

    route.get('/', authenticate, async (req: Request, res: Response, next: NextFunction) => {
        return res.json(req.user);
    });
}
