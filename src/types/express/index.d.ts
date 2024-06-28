
import { UserType } from '../../interfaces/User.interface';


declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}
