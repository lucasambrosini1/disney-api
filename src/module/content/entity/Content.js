module.exports = class Content {
  constructor({
    id,
    image,
    date,
    name,
    rating,
    type,
    genreId,
    genre,
    characters,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.id = id;
    this.image = image;
    this.date = date;
    this.name = name;
    this.rating = rating;
    this.type = type;
    this.genreId = genreId;
    this.genre = genre;
    this.characters = characters;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
};
