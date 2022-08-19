const bcrypt = require('bcrypt');

const hashPassword = (password) => {
  const SALT = 10;
  return bcrypt.hashSync(password, SALT);
};

const validatePassword = (requestPassword, hashedPassword) => bcrypt.compareSync(requestPassword, hashedPassword);

module.exports = { hashPassword, validatePassword };
