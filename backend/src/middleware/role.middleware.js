// src/middleware/role.middleware.js

export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access Denied: Insufficient permissions' });
    }

    next();
  };
};
