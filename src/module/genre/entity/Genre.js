module.exports = class Genre {
  constructor({
    id,
    image,
    name,
    content,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.id = id;
    this.image = image;
    this.name = name;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
};
