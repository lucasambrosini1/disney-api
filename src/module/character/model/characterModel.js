const { Model, DataTypes } = require('sequelize');

class CharacterModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof ReservationModel}
   */

  static setup(sequelizeInstance) {
    CharacterModel.init(
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
        image: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        age: {
          type: DataTypes.INTEGER,
          allowNull: false,

        },
        weight: {
          type: DataTypes.DECIMAL,
          allowNull: false,

        },
        story: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Character',
        tableName: 'characters',
        underscored: true,
        paranoid: true,
      },
    );
    return CharacterModel;
  }
}

module.exports = CharacterModel;
