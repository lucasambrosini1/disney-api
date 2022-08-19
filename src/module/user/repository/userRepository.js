const { fromModelToEntity } = require('../mapper/userMapper');

module.exports = class UserRepository {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async save(user) {
    let userModel;
    const buildOptions = { isNewRecord: !user.id };
    userModel = this.userModel.build(user, buildOptions);
    userModel = await userModel.save();
    return fromModelToEntity(userModel);
  }

  async deleteById(id) {
    if (id === undefined) {
      throw new Error('User is not defined');
    }
    return Boolean(await this.userModel.destroy({ where: { id } }));
  }

  async getById(id) {
    const userModel = await this.userModel.findOne({ where: { id } });
    if (!userModel) {
      throw new Error(`User with ID: ${id} has not been found`);
    }
    return fromModelToEntity(userModel);
  }

  async getByUsername(username) {
    const userModel = await this.userModel.findOne({ where: { username } });
    if (!userModel) {
      throw new Error(`User with username: ${username} has not been found`);
    }
    return fromModelToEntity(userModel);
  }

  async getAll() {
    const users = await this.userModel.findAll();
    return users.map(fromModelToEntity);
  }
};
