const { validationResult } = require('express-validator');

const validateResults = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (err) {
    res.status(403);
    res.json({ errors: err.array() });
  }
};

module.exports = validateResults;
