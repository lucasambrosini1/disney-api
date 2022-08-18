const Content = require('../entity/Content');

exports.fromModelToEntity = (
  model,
) => {
  const content = model.toJSON();
  content.characters = model.Characters;
  return new Content(content);
};

exports.fromDataToEntity = ({
  id,
  image,
  name,
  rating,
  type,
  date,
  genreId,
  genre,
  characters,
  createdAt,
  updatedAt,
  deletedAt,
}) => new Content({
  id,
  image,
  name,
  rating,
  type,
  date,
  genreId,
  genre,
  characters,
  createdAt,
  updatedAt,
  deletedAt,
});
