module.exports = class User {
  constructor({
    id,
    username,
    password,
    name,
    lastname,
    email,
    createdAt,
    updatedAt,
    deletedAt,
  }) {
    this.id = id;
    this.username = username;
    this.name = name;
    this.password = password;
    this.lastname = lastname;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.deletedAt = deletedAt;
  }
};
