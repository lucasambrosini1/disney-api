const { check } = require('express-validator');
const validateResults = require('../helpers/validationHelper');

const validateSave = [
  check('name')
    .exists()
    .notEmpty(),
  check('image')
    .exists()
    .notEmpty(),
  check('age')
    .exists()
    .notEmpty()
    .isInt({ min: 0, max: 99 }),
  check('weight')
    .exists()
    .notEmpty()
    .isNumeric({ min: 1, max: 200 }),
  check('story')
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
  check('name')
    .exists()
    .notEmpty(),
  check('image')
    .exists()
    .notEmpty(),
  check('age')
    .exists()
    .notEmpty()
    .isInt({ min: 0, max: 99 }),
  check('weight')
    .exists()
    .notEmpty()
    .isNumeric({ min: 1, max: 200 }),
  check('story')
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
