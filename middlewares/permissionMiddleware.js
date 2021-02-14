exports.minimumPermissionLevelRequired = (requiredPermissionLevel) => (req, res, next) => {
  const userPermissionLevel = parseInt(req.jwt.permissionLevel);
  if (userPermissionLevel & requiredPermissionLevel) {
    return next();
  }
  return res.status(403).send();
};