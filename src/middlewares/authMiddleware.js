const { verifyToken } = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error('You need to be logged in to do this.');
    }
    const token = req.headers.authorization.split(' ').pop();
    const tokenIsVerified = await verifyToken(token);

    if (!tokenIsVerified) {
      throw new Error('Invalid token');
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = authMiddleware;
