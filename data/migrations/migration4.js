const UserModel = require('../../src/module/user/model/userModel');
const ContentModel = require('../../src/module/content/model/contentModel');
const CharacterModel = require('../../src/module/character/model/characterModel');
const GenreModel = require('../../src/module/genre/model/genreModel');

module.exports = {
  up: async (queryInterface) => {
    await UserModel.setup(queryInterface.sequelize).sync({ force: true });
    await CharacterModel.setup(queryInterface.sequelize).sync({ force: true });
    await GenreModel.setup(queryInterface.sequelize).sync({ force: true });
    await ContentModel.setup(queryInterface.sequelize).sync({ force: true });
    await ContentModel.setupAssociations(CharacterModel, GenreModel)
      .sync({ force: true });
    await queryInterface.sequelize.sync({ force: true });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('users');
    await queryInterface.dropTable('content');
    await queryInterface.dropTable('characters');
    await queryInterface.dropTable('genres');
    await queryInterface.dropTable('content_characters');
  },
};
