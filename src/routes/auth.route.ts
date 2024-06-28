import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import validBodyRequest from '../middlewares/validBodyRequest';
import { loginSchema, registerSchema } from '../validations/auth.validation';

const authRouter = Router();

authRouter.post('/register', validBodyRequest(registerSchema), register);
authRouter.post('/login', validBodyRequest(loginSchema), login);

export default authRouter;
