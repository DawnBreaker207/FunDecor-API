import { Router } from 'express';
import { login, register } from '../controllers/auth';
import validBodyRequest from '../middlewares/validBodyRequest';
import { loginSchema, registerSchema } from '../validations/auth';

const authRouter = Router();

authRouter.post('/register', validBodyRequest(registerSchema), register);
authRouter.post('/login', validBodyRequest(loginSchema), login);

export default authRouter;
