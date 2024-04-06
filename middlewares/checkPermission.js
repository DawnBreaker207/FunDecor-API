import { errorMessage } from '../constants/message.js';

export const checkPermission = (roles) => (req, res, next) => {
  //! roles = ['admin', 'manager', 'pm'] => role
  //! permission
  const hashPermission = roles((role) => req.user.roles.includes(role));
  if (!hashPermission) {
    return res.status(403).json({
      message: errorMessage.PERMISSION_DENIED,
    });
  }
  next();
};
