const Genre = require('../entity/Genre');

exports.fromModelToEntity = (
  model,
) => {
  const genre = model.toJSON();
  genre.content = model.Contents;
  return new Genre(genre);
};

exports.fromDataToEntity = ({
  id,
  image,
  name,
  content,
  createdAt,
  updatedAt,
  deletedAt,
}) => new Genre({
  id,
  image,
  name,
  content,
  createdAt,
  updatedAt,
  deletedAt,
});
