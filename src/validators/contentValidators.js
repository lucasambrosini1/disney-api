const { check } = require('express-validator');
const validateResults = require('../helpers/validationHelper');

const validateSave = [
  check('image')
    .exists()
    .notEmpty(),
  check('name')
    .exists()
    .notEmpty()
    .isLength({ min: 3 }),
  check('rating')
    .exists()
    .notEmpty()
    .isNumeric({ min: 1, max: 5 }),
  check('date')
    .exists()
    .notEmpty()
    .isISO8601()
    .toDate(),
  check('genreId')
    .exists()
    .notEmpty()
    .isInt(),
  check('characters')
    .exists()
    .notEmpty()
    .isArray(),
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
    .notEmpty()
    .isLength({ min: 3 }),
  check('rating')
    .exists()
    .notEmpty()
    .isNumeric({ min: 1, max: 5 }),
  check('date')
    .exists()
    .notEmpty()
    .isISO8601('yyyy-mm-dd'),
  check('genreId')
    .exists()
    .notEmpty()
    .isInt(),
  check('characters')
    .exists()
    .notEmpty()
    .isArray(),
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
