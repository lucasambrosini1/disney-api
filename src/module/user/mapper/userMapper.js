const User = require('../entity/User');

exports.fromModelToEntity = (
  model,
) => new User(
  model.toJSON(),
);

exports.fromDataToEntity = ({
  id,
  username,
  password,
  name,
  lastname,
  email,
  createdAt,
  updatedAt,
  deletedAt,
}) => new User({
  id,
  username,
  password,
  name,
  lastname,
  email,
  createdAt,
  updatedAt,
  deletedAt,
});
