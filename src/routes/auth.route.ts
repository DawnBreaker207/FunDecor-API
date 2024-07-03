import { Router } from 'express';
import {
  Check_Authorize,
  Login,
  Register,
} from '../controllers/auth.controller';
import { checkAuth } from '../middlewares/checkAuth';
import { checkIsAdmin } from '../middlewares/checkIsAdmin';
import validBodyRequest from '../middlewares/validBodyRequest';
import { loginSchema, registerSchema } from '../validations/auth.validation';

const authRouter = Router();

authRouter.post('/register', validBodyRequest(registerSchema), Register);
authRouter.post('/login', validBodyRequest(loginSchema), Login);
authRouter.get('/check-auth', checkAuth, checkIsAdmin, Check_Authorize);

export default authRouter;
