module.exports = class Character {
  constructor({
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
  }) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.age = age;
    this.weight = weight;
    this.story = story;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
};
