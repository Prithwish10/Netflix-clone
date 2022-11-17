import { Router } from 'express';
import auth from './auth.route';
import user from './user.route';

export default () => {
	const app = Router();
    
    auth(app);
	user(app);

	return app;
}