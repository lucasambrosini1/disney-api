const { check } = require('express-validator');
const validateResults = require('../helpers/validationHelper');

const validateLogin = [
  check('username')
    .exists()
    .notEmpty(),
  check('password')
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];

const validateRegister = [
  check('username')
    .exists()
    .notEmpty(),
  check('password')
    .exists()
    .notEmpty(),
  check('name')
    .exists()
    .notEmpty(),
  check('lastname')
    .exists()
    .notEmpty(),
  check('email')
    .exists()
    .notEmpty()
    .isEmail(),
  (req, res, next) => validateResults(req, res, next),
];

module.exports = {
  validateLogin, validateRegister,
};
