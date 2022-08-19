const { check } = require('express-validator');
const validateResults = require('../helpers/validationHelper');

const validateSave = [
  check('image')
    .exists()
    .notEmpty(),
  check('name')
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next),
];

const validateView = [
  check('id')
    .exists()
    .notEmpty()
    .isInt(),
  (req, res, next) => validateResults(req, res, next),

];

const validateEdit = [
  check('id')
    .exists()
    .notEmpty()
    .isInt(),
  check('image')
    .exists()
    .notEmpty(),
  check('name')
    .exists()
    .notEmpty(),
  (req, res, next) => validateResults(req, res, next),

];

const validateDelete = [
  check('id')
    .exists()
    .notEmpty()
    .isInt(),
  (req, res, next) => validateResults(req, res, next),

];

module.exports = {
  validateSave, validateView, validateEdit, validateDelete,
};
