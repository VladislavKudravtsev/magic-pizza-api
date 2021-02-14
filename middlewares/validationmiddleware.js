const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtSecret = process.env.jwt_secret;

exports.validateJWT = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const authorization = await req.headers.authorization.split(' ');
      if (authorization[0] !== 'Bearer') {
        return res.status(401).end();
      }
      req.jwt = jwt.verify(authorization[1], jwtSecret);
      return next();
    } catch (error) {
      return res.status(403).send(error);
    }
  }
  return res.status(401).end();
};