const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const signToken = async (userId) => jwt.sign({ userId }, JWT_SECRET, {
  expiresIn: '100h',
});

const verifyToken = async (token) => jwt.verify(token, JWT_SECRET);

module.exports = { signToken, verifyToken };
