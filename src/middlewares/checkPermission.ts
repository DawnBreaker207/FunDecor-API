import { NextFunction, Request, Response } from 'express';
import { messageError } from '../constants/message';
import { statusCode } from '../constants/statusCode';

export const checkPermission =
  (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    //! roles = ['admin', 'manager', 'pm'] => role
    //! permission

    const hashPermission = roles.some((roleUser) =>
      req?.user?.role?.includes(roleUser)
    );

    if (!hashPermission) {
      return res.status(statusCode.FORBIDDEN).json({
        message: messageError.PERMISSION_DENIED,
      });
    }
    next();
  };
