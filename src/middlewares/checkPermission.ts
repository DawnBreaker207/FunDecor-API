import { NextFunction, Request, Response } from 'express';
import { errorMessage } from '../constants/message';


export const checkPermission =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    //! roles = ['admin', 'manager', 'pm'] => role
    //! permission

    const hashPermission = roles.some((roleUser) =>
      req?.user?.role?.includes(roleUser)
    );

    if (!hashPermission) {
      return res.status(403).json({
        message: errorMessage.PERMISSION_DENIED,
      });
    }
    next();
  };
