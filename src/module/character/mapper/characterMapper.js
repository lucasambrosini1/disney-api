const Character = require('../entity/character');

exports.fromModelToEntity = (
  model,
) => {
  const character = model.toJSON();
  character.content = model.Contents;
  return new Character(character);
};

exports.fromDataToEntity = ({
  id,
  name,
  image,
  age,
  weight,
  story,
  content,
  createdAt,
  updatedAt,
  deletedAt,
}) => new Character({
  id,
  name,
  image,
  age,
  weight,
  story,
  content,
  createdAt,
  updatedAt,
  deletedAt,
});
