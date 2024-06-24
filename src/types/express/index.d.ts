import { UserType } from '../../interfaces/User.ts';

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
