const { Model, DataTypes } = require('sequelize');

class ContentModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof ContentModel}
   */

  static setup(sequelizeInstance) {
    ContentModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        rating: {
          type: DataTypes.DECIMAL,
          allowNull: false,

        },
        image: {
          type: DataTypes.STRING,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Content',
        tableName: 'content',
        underscored: true,
        paranoid: true,
      },
    );
    return ContentModel;
  }

  static setupAssociations(CharacterModel, GenreModel) {
    // ContentModel.belongsTo(GenreModel, { foreignKey: 'genreId', constraints: true });
    // GenreModel.hasMany(ContentModel, { foreignKey: 'genreId', constraints: true });
    ContentModel.belongsToMany(CharacterModel, { through: 'content_characters' });
    CharacterModel.belongsToMany(ContentModel, { through: 'content_characters' });
    return ContentModel;
  }
}

module.exports = ContentModel;
